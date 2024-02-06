import { BehaviorSubject, from, map, of, Subject, switchMap } from 'rxjs'

import { matchRoute } from '../match-route.js'
import type { HtmlMetaDescriptor, LoaderDescriptor } from '../page.js'
import { parseParams, parsePath, type Path } from '../path.js'
import {
	type ClientRoute,
	notFoundRoute,
	type RouteDescriptor,
	type RouteModule,
} from '../routes.js'
import { QueryModel } from './query-model.js'

type RouteParams = Record<string, string>

export interface RouteState {
	Component: ClientRoute<unknown, RouteDescriptor>['Component']
	loader: LoaderDescriptor
	meta: HtmlMetaDescriptor
	params: Readonly<RouteParams>
	pathname: Path['pathname']
	search: Path['search']
	type: PreloadRouteOptions['type']
}

export type RouteLink = { pathname: string; params?: RouteParams } | { href: string }
export type PreloadRouteOptions = RouteLink & { type: 'push' | 'replace' | 'popstate' }

export interface InitialRouteOptions {
	href: string
	loader?: LoaderDescriptor
	meta?: HtmlMetaDescriptor
}

export class RouterModel {
	routeStore = new BehaviorSubject<RouteState>(RouterModel.createRouteState(null))
	preloadStore = new Subject<PreloadRouteOptions>()

	preloadObs = this.preloadStore.pipe(
		switchMap((options) => {
			const state = RouterModel.createRouteState(options)
			const module = state.Component.fulfilled

			if (module) {
				RouterModel.setRouteDescriptors(state, module)
				return of({ loading: false, state })
			}

			// Preload

			const preloadingQuery = new QueryModel<RouteModule>()

			void preloadingQuery.run(async () => {
				const loadedModule = await state.Component.loader()
				RouterModel.setRouteDescriptors(state, loadedModule)
				return loadedModule
			})

			return from(preloadingQuery.store).pipe(map(({ loading }) => ({ loading, state })))
		}),
	)

	/**
	 * @override state.loader
	 * @override state.meta
	 */
	private static setRouteDescriptors(state: RouteState, module: RouteModule): void {
		const routeLoader = module.loader?.()
		if (routeLoader) state.loader = routeLoader

		const routeMeta = module.meta?.()
		if (routeMeta) state.meta = routeMeta
	}

	private static createRouteState(options: PreloadRouteOptions | null): RouteState {
		const state: RouteState = {
			Component: notFoundRoute.Component,
			loader: {},
			meta: {},
			params: {},
			pathname: '',
			search: '',
			type: options?.type ?? 'push',
		}

		if (options === null) return state

		if ('href' in options) {
			const { pathname, search } = parsePath(options.href)
			const params = parseParams(search)
			Object.assign(state, { pathname, params, search })
		} else {
			const { pathname, params = {} } = options
			const search = new URLSearchParams(params).toString()
			Object.assign(state, { pathname: pathname || '/', params, search })
		}

		const route = matchRoute(state.pathname)
		if (route?.Component) state.Component = route.Component

		return state
	}

	// Actions

	setRoute({ loader, meta, href }: InitialRouteOptions): void {
		const state = RouterModel.createRouteState({ type: 'popstate', href })
		if (loader) state.loader = loader
		if (meta) state.meta = meta
		this.routeStore.next(state)
	}

	navigate(pathname: string, params?: RouteParams, replace = false) {
		this.preloadStore.next({ pathname, params, type: replace ? 'replace' : 'push' })
	}
}
