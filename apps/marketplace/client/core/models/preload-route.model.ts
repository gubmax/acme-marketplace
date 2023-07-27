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
import { QueryModel } from 'client/core/models/query.model.js'
import { routes } from 'client/routes.js'
import type { HtmlMetaDescriptor, MetaFunction, PayloadDescriptor } from '../components/page.js'
import type { CustomRouteObject } from '../enhance-routes.js'

interface RouteModuleExports {
	meta?: MetaFunction
	payload?: () => PayloadDescriptor
}

type RouteModule = DynamicFactory<unknown, RouteModuleExports>
type RouteElement = ReactElement<DynamicProps, DynamicComponentType<unknown, RouteModuleExports>>

class PreloadRouteModel extends QueryModel<Array<DynamicModule & RouteModuleExports>> {
	#cache = new WeakMap<RouteModule, { meta?: HtmlMetaDescriptor; payload?: PayloadDescriptor }>()
	updateSubject = new Subject<Update>()

	preloadObs = this.updateSubject.pipe(
		// Reset query state
		tap(() => this.reset()),
		// Preload modules
		switchMap((update) => {
			const loaders: RouteModule[] = []
			const meta: HtmlMetaDescriptor = {}
			const payload: PayloadDescriptor = {}
			const matchedRoutes = matchRoutes<CustomRouteObject>(routes, update.location)
			invariant(matchedRoutes)

			for (const routeObj of matchedRoutes) {
				const elWithLoader = routeObj.route.element as RouteElement

				if ('loader' in elWithLoader.type) {
					const { loader } = elWithLoader.type
					if (this.#cache.has(loader)) {
						const cache = this.#cache.get(loader)

						if (cache?.meta) Object.assign(meta, cache.meta)
						if (cache?.payload) Object.assign(payload, cache.payload)
					} else loaders.push(loader)
				}
			}

			if (!loaders.length) return of({ update, meta, payload })

			const loaderPromises = loaders.map(async (loader) => {
				const mod = await loader()

				const routeMeta = mod.meta?.()
				const routePayload = mod.payload?.()

				this.#cache.set(loader, { meta: routeMeta, payload: routePayload })

				if (routeMeta) Object.assign(meta, routeMeta)
				if (routePayload) Object.assign(payload, routePayload)
				return mod
			})

			const queryPromise = this.run(() => Promise.all(loaderPromises))

			return from(queryPromise).pipe(map(() => ({ update, meta, payload })))
		}),
	)
}

/**
 * @deprecated Needs refactoring and deprecation of QueryModel
 */
export const preloadRouteModel = new PreloadRouteModel()
