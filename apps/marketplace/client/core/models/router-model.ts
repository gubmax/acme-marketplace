import { BehaviorSubject, from, iif, map, of, Subject, switchMap, tap } from 'rxjs'

import type {
	HtmlMetaDescriptor,
	MetaFunction,
	PayloadDescriptor,
	PayloadFunction,
} from '../components/page.js'
import { type DynamicModule } from '../dynamic.js'
import { matchRoute } from '../match-route.js'
import { parseParams, parsePath, type Path } from '../path.js'
import { type ClientRoute, notFoundRoute } from '../routes.js'
import { QueryModel, QueryStatus } from './query-model.js'

export interface RouteDescriptor {
	meta?: MetaFunction
	payload?: PayloadFunction
}

type RouteModule = DynamicModule & RouteDescriptor
type RouteElement = ClientRoute<RouteDescriptor>['element']
type RouteParams = Record<string, string>
type RouteLink = { pathname: string; params?: RouteParams } | { href: string }

// Route

export interface RouteState {
	element: RouteElement
	meta: HtmlMetaDescriptor
	params: Readonly<RouteParams>
	pathname: Path['pathname']
	payload: PayloadDescriptor
	search: string
	type: PreloadOptions['type']
}

function createRouteState(options: PreloadOptions | null): RouteState {
	const state = {
		element: notFoundRoute.element,
		meta: {},
		params: {},
		pathname: '',
		payload: {},
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

	const routeElement = matchRoute(state.pathname)?.element
	if (routeElement) state.element = routeElement

	return state
}

export const routeStore = new BehaviorSubject<RouteState>(createRouteState(null))

// Preload route

type PreloadOptions = RouteLink & { type: 'push' | 'replace' | 'popstate' }
export const preloadStore = new Subject<PreloadOptions>()

const preloadingQuery = new QueryModel<RouteModule>({ type: QueryStatus.loading })
export const preloadingQueryStore = preloadingQuery.queryStore

/**
 * @override state.meta
 * @override state.payload
 */
function setRouteDescriptors(state: RouteState, module: RouteModule) {
	const routeMeta = module.meta?.()
	if (routeMeta) state.meta = routeMeta

	const routePayload = module.payload?.()
	if (routePayload) state.payload = routePayload
}

export const preloadRouteObs = preloadStore.pipe(
	// Reset query state
	tap(() => {
		preloadingQuery.reset()
	}),
	// Preload module
	switchMap((options) => {
		const state = createRouteState(options)
		const dynamicComponent = state.element.type

		if (dynamicComponent.fulfilled) setRouteDescriptors(state, dynamicComponent.fulfilled)

		// Preload
		return iif(
			() => !!dynamicComponent.fulfilled,
			of(state),
			of(state).pipe(
				switchMap(() => {
					return from(
						preloadingQuery.run(async () => {
							const module = await dynamicComponent.loader()
							setRouteDescriptors(state, module)
							return module
						}),
					).pipe(map(() => state))
				}),
			),
		)
	}),
)

// Actions

export interface InitialRouteOptions {
	href: string
	meta?: HtmlMetaDescriptor
	payload?: PayloadDescriptor
}

export function setInitialPage({ meta, payload, href }: InitialRouteOptions): void {
	const state = createRouteState({ type: 'popstate', href })
	if (meta) state.meta = meta
	if (payload) state.payload = payload
	routeStore.next(state)
}

export function openPage(pathname: string, params?: RouteParams, replace = false) {
	preloadStore.next({ params, pathname, type: replace ? 'replace' : 'push' })
}
