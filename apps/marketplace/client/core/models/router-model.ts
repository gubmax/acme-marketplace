import { BehaviorSubject, from, iif, map, of, Subject, switchMap, tap } from 'rxjs'

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

export interface RouteDescriptor {
	meta?: MetaFunction
	payload?: PayloadFunction
}

type RouteFactory = DynamicFactory<unknown, RouteDescriptor>
type RouteModule = DynamicModule & RouteDescriptor
type RouteElement = ClientRoute<RouteDescriptor>['element']

// Route

export interface RouteContext {
	type: PreloadOptions['type']
	url: PreloadOptions['url']
	element: RouteElement
	meta: HtmlMetaDescriptor
	payload: PayloadDescriptor
}

export const routeStore = new BehaviorSubject<RouteContext>({
	element: notFoundRoute.element,
	meta: {},
	payload: {},
	type: 'popstate',
	url: '',
})

// Preload route

interface PreloadOptions {
	type: 'push' | 'replace' | 'popstate'
	url: string
}

export const preloadStore = new Subject<PreloadOptions>()

const preloadingQuery = new QueryModel<RouteModule[]>({ type: QueryStatus.loading })
export const preloadingQueryStore = preloadingQuery.queryStore

const preloadingCache = new WeakMap<RouteElement, Pick<RouteContext, 'meta' | 'payload'>>()

export const preloadRouteObs = preloadStore.pipe(
	// Reset query state
	tap(() => preloadingQuery.reset()),
	// Preload modules
	switchMap(({ type, url }) => {
		const loaders: RouteFactory[] = []
		const data: RouteContext = {
			element: notFoundRoute.element,
			meta: {},
			payload: {},
			type,
			url,
		}

		// Match route element

		const routeElement = matchRoute(url)?.element
		if (routeElement) data.element = routeElement

		// Get loaders for current route module

		if (data.element && 'loader' in data.element.type) {
			const { loader } = data.element.type

			if (preloadingCache.has(data.element)) {
				const cache = preloadingCache.get(data.element)
				Object.assign(data, cache)
			} else loaders.push(loader)
		}

		// Preload
		return iif(
			() => !loaders.length,
			of(data).pipe(tap(() => routeStore.next(data))),
			of(data).pipe(
				switchMap(() => {
					const loaderPromises = loaders.map(async (loader) => {
						const module = await loader()

						const routeMeta = module.meta?.()
						if (routeMeta) data.meta = routeMeta

						const routePayload = module.payload?.()
						if (routePayload) data.payload = routePayload

						return module
					})

					return from(preloadingQuery.run(() => Promise.all(loaderPromises))).pipe(
						tap(() => {
							const { element, meta, payload } = data
							preloadingCache.set(element, { meta, payload })
							routeStore.next(data)
						}),
						map(() => data),
					)
				}),
			),
		)
	}),
)

// Actions

export interface InitialRouteOptions {
	meta?: RouteContext['meta']
	payload?: RouteContext['payload']
	url: string
}

export function setInitialRoute({ meta = {}, payload = {}, url }: InitialRouteOptions) {
	const element = matchRoute(url)?.element ?? notFoundRoute.element
	routeStore.next({ element, meta, payload, type: 'push', url })
}

// TODO: Add programmatic navigation
// openPage
// redirectPage
