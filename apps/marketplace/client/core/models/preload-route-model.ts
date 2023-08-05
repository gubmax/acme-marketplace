import type { ReactElement } from 'react'
import { matchRoutes } from 'react-router-dom'
import type { Update } from 'history'
import { from, iif, map, of, Subject, switchMap, tap } from 'rxjs'

import { invariant } from 'client/common/helpers/invariant.js'
import type {
	DynamicComponentType,
	DynamicFactory,
	DynamicModule,
	DynamicProps,
} from 'client/core/dynamic.js'
import { QueryModel, QueryStatus } from 'client/core/models/query-model.js'
import { routes } from 'client/routes.js'
import type { HtmlMetaDescriptor, MetaFunction, PayloadDescriptor } from '../components/page.js'
import type { CustomRouteObject } from '../enhance-routes.js'

interface RouteModuleExports {
	meta?: MetaFunction
	payload?: () => PayloadDescriptor
}

type RouteModule = DynamicFactory<unknown, RouteModuleExports>
type RouteElement = ReactElement<DynamicProps, DynamicComponentType<unknown, RouteModuleExports>>
type PreloadData = { meta?: HtmlMetaDescriptor; payload?: PayloadDescriptor }

const updateSubject = new Subject<Update>()
const preloadCache = new WeakMap<RouteModule, PreloadData>()
const preloadQuery = new QueryModel<Array<DynamicModule & RouteModuleExports>>({
	type: QueryStatus.loading,
})

const preloadObs = updateSubject.pipe(
	// Reset query state
	tap(() => preloadQuery.reset()),
	// Preload modules
	switchMap((update) => {
		const data: PreloadData = { meta: {}, payload: {} }
		const loaders: RouteModule[] = []

		const matchedRoutes = matchRoutes<CustomRouteObject>(routes, update.location)
		invariant(matchedRoutes)

		// Get loaders for current route module
		for (const routeObj of matchedRoutes) {
			const elWithLoader = routeObj.route.element as RouteElement

			if ('loader' in elWithLoader.type) {
				const { loader } = elWithLoader.type

				if (preloadCache.has(loader)) {
					const cache = preloadCache.get(loader)

					if (cache?.meta) data.meta = cache.meta
					if (cache?.payload) data.payload = cache.payload
				} else loaders.push(loader)
			}
		}

		return iif(
			() => !loaders.length,
			of(data),
			of(data).pipe(
				switchMap(() => {
					const loaderPromises = loaders.map(async (loader) => {
						const mod = await loader()

						const routeMeta = mod.meta?.()
						const routePayload = mod.payload?.()

						if (routeMeta) data.meta = routeMeta
						if (routePayload) data.payload = routePayload

						preloadCache.set(loader, data)

						return mod
					})

					return from(preloadQuery.run(() => Promise.all(loaderPromises))).pipe(map(() => data))
				}),
			),
		)
	}),
)

export const preloadRouteModel = {
	preloadObs,
	preloadQuery,
	updateSubject,
}
