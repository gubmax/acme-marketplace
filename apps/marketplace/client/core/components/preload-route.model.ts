import type { ReactElement } from 'react'
import { matchRoutes } from 'react-router-dom'
import type { Update } from 'history'
import { from, map, of, Subject, switchMap, tap } from 'rxjs'

import { invariant } from 'client/common/helpers/invariant.js'
import type {
	DynamicComponentType,
	DynamicFactory,
	DynamicModule,
	DynamicProps,
} from 'client/core/dynamic.js'
import { QueryModel } from 'client/core/query.model.js'
import { type CustomRouteObject, routes } from 'client/routes.js'
import type { HtmlMetaDescriptor, MetaFunction } from './modules'

interface RouteModuleExports {
	meta?: MetaFunction
}

type RouteModule = DynamicFactory<unknown, RouteModuleExports>
type RouteElement = ReactElement<DynamicProps, DynamicComponentType<unknown, RouteModuleExports>>

class PreloadRouteModel extends QueryModel<Array<DynamicModule & RouteModuleExports>> {
	#cache = new WeakMap<RouteModule, { meta?: HtmlMetaDescriptor }>()
	updateSubject = new Subject<Update>()

	preloadObs = this.updateSubject.pipe(
		// Reset query state
		tap(() => this.reset()),
		// Preload modules
		switchMap((update) => {
			const loaders: RouteModule[] = []
			const meta: HtmlMetaDescriptor = {}
			const matchedRoutes = matchRoutes<CustomRouteObject>(routes, update.location)
			invariant(matchedRoutes)

			for (const routeObj of matchedRoutes) {
				const elWithLoader = routeObj.route.element as RouteElement

				if ('loader' in elWithLoader.type) {
					const { loader } = elWithLoader.type
					if (this.#cache.has(loader)) {
						const routeMeta = this.#cache.get(loader)?.meta
						if (routeMeta) Object.assign(meta, routeMeta)
					} else loaders.push(loader)
				}
			}

			if (!loaders.length) return of({ update, meta })

			const loaderPromises = loaders.map(async (loader) => {
				const mod = await loader()
				const routeMeta = mod.meta?.()
				this.#cache.set(loader, { meta: routeMeta })
				if (routeMeta) Object.assign(meta, routeMeta)
				return mod
			})

			const queryPromise = this.run(() => Promise.all(loaderPromises))

			return from(queryPromise).pipe(map(() => ({ update, meta })))
		}),
	)
}

export const preloadRouteModel = new PreloadRouteModel()
