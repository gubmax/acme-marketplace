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
import { queryModel } from './query-model.js'

type RouteParams = Record<string, string>

// Route

export interface RouteState {
	Component: ClientRoute<unknown, RouteDescriptor>['Component']
	loader: LoaderDescriptor
	meta: HtmlMetaDescriptor
	params: Readonly<RouteParams>
	pathname: Path['pathname']
	search: string
	type: PreloadOptions['type']
}

function createRouteState(options: PreloadOptions | null): RouteState {
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

export const routeStore = new BehaviorSubject<RouteState>(createRouteState(null))

// Preload route

type RouteLink = { pathname: string; params?: RouteParams } | { href: string }
type PreloadOptions = RouteLink & { type: 'push' | 'replace' | 'popstate' }
export const preloadStore = new Subject<PreloadOptions>()

/**
 * @override state.meta
 */
function setRouteDescriptors(state: RouteState, module: RouteModule): void {
	const routeLoader = module.loader?.()
	if (routeLoader) state.loader = routeLoader

	const routeMeta = module.meta?.()
	if (routeMeta) state.meta = routeMeta
}

export const preloadRouteObs = preloadStore.pipe(
	switchMap((options) => {
		const state = createRouteState(options)
		const module = state.Component.fulfilled

		if (module) {
			setRouteDescriptors(state, module)
			return of({ loading: false, state })
		}

		// Preload

		const preloadingQuery = queryModel<RouteModule>()

		void preloadingQuery.run(async () => {
			const loadedModule = await state.Component.loader()
			setRouteDescriptors(state, loadedModule)
			return loadedModule
		})

		return from(preloadingQuery.store).pipe(map(({ loading }) => ({ loading, state })))
	}),
)

// Actions

export interface InitialRouteOptions {
	href: string
	loader?: LoaderDescriptor
	meta?: HtmlMetaDescriptor
}

export function setInitialPage({ loader, meta, href }: InitialRouteOptions): void {
	const state = createRouteState({ type: 'popstate', href })
	if (loader) state.loader = loader
	if (meta) state.meta = meta
	routeStore.next(state)
}

export function openPage(pathname: string, params?: RouteParams, replace = false) {
	preloadStore.next({ params, pathname, type: replace ? 'replace' : 'push' })
}
