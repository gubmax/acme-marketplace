import { from, iif, map, of, Subject, switchMap, tap } from 'rxjs'

import type {
	HtmlMetaDescriptor,
	MetaFunction,
	PayloadDescriptor,
	PayloadFunction,
} from '../components/page.js'
import { type DynamicFactory, type DynamicModule } from '../dynamic.js'
import { matchRoute } from '../match-route.js'
import { type ClientRoute, notFoundRoute } from '../routes.js'
import { QueryModel, QueryStatus } from './query-model.js'

interface RouteModuleExports {
	meta?: MetaFunction
	payload?: PayloadFunction
}

type RouteModule = DynamicFactory<unknown, RouteModuleExports>

interface History {
	type: 'push' | 'replace' | 'popstate'
	url: string
}

export interface RouteContext {
	type: History['type']
	url: History['url']
	element: ClientRoute<RouteModuleExports>['element']
	meta?: HtmlMetaDescriptor
	payload?: PayloadDescriptor
}

const historyStore = new Subject<History>()
const preloadCache = new WeakMap<RouteModule, RouteContext>()
const preloadQuery = new QueryModel<Array<DynamicModule & RouteModuleExports>>({
	type: QueryStatus.loading,
})

const preloadRouteObs = historyStore.pipe(
	// Reset query state
	tap(() => preloadQuery.reset()),
	// Preload modules
	switchMap(({ type, url }) => {
		const data: RouteContext = { type, url, element: notFoundRoute.element, meta: {}, payload: {} }
		const loaders: RouteModule[] = []

		// Match route element
		const routeElement = matchRoute(url)?.element
		if (routeElement) data.element = routeElement

		// Get loaders for current route module

		if (data.element && 'loader' in data.element.type) {
			const { loader } = data.element.type

			if (preloadCache.has(loader)) {
				const cache = preloadCache.get(loader)
				if (cache?.meta) data.meta = cache.meta
				if (cache?.payload) data.payload = cache.payload
			} else loaders.push(loader)
		}

		// Preload
		return iif(
			() => !loaders.length,
			of(data),
			of(data).pipe(
				switchMap(() => {
					const loaderPromises = loaders.map(async (loader) => {
						const module = await loader()

						const routeMeta = module.meta?.()
						if (routeMeta) data.meta = routeMeta

						const routePayload = module.payload?.()
						if (routePayload) data.payload = routePayload

						preloadCache.set(loader, data)

						return module
					})

					return from(preloadQuery.run(() => Promise.all(loaderPromises))).pipe(map(() => data))
				}),
			),
		)
	}),
)

export const routerModel = {
	preloadRouteObs,
	queryStore: preloadQuery.queryStore,
	historyStore,
	// TODO: Add programmatic navigation
	// openPage,
	// redirectPage,
}
