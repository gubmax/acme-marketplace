import { BehaviorSubject, first, from, iif, map, of, Subject, switchMap, tap } from 'rxjs'

import type {
	HtmlMetaDescriptor,
	MetaFunction,
	PayloadDescriptor,
	PayloadFunction,
} from '../components/page.js'
import { type DynamicFactory, type DynamicModule } from '../dynamic.js'
import { matchRoute } from '../match-route.js'
import { parseParams, parsePath, type Path } from '../path.js'
import { type ClientRoute, notFoundRoute } from '../routes.js'
import { QueryModel, QueryStatus } from './query-model.js'

export interface RouteDescriptor {
	meta?: MetaFunction
	payload?: PayloadFunction
}

type RouteFactory = DynamicFactory<unknown, RouteDescriptor>
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

const preloadingQuery = new QueryModel<RouteModule[]>({ type: QueryStatus.loading })
export const preloadingQueryStore = preloadingQuery.queryStore

const preloadingCache = new WeakMap<RouteElement, Pick<RouteState, 'meta' | 'payload'>>()

export const preloadRouteObs = preloadStore.pipe(
	// Reset query state
	tap(() => {
		preloadingQuery.reset()
	}),
	// Preload modules
	switchMap((options) => {
		const loaders: RouteFactory[] = []
		const state = createRouteState(options)

		// Get loaders for current route module

		if ('loader' in state.element.type) {
			const { loader } = state.element.type

			if (preloadingCache.has(state.element)) {
				const cache = preloadingCache.get(state.element)
				Object.assign(state, cache)
			} else loaders.push(loader)
		}

		// Preload
		return iif(
			() => !loaders.length,
			of(state),
			of(state).pipe(
				switchMap(() => {
					const loaderPromises = loaders.map(async (loader) => {
						const module = await loader()

						const routeMeta = module.meta?.()
						if (routeMeta) state.meta = routeMeta

						const routePayload = module.payload?.()
						if (routePayload) state.payload = routePayload

						return module
					})

					return from(preloadingQuery.run(() => Promise.all(loaderPromises))).pipe(
						tap(() => {
							const { element, meta, payload } = state
							preloadingCache.set(element, { meta, payload })
						}),
						map(() => state),
					)
				}),
			),
		)
	}),
)

// Actions

interface InitialRouteOptions {
	href: string
	meta?: HtmlMetaDescriptor
	payload?: PayloadDescriptor
}

export function setInitialPage({ meta, payload, href }: InitialRouteOptions): void {
	const state = createRouteState({ type: 'popstate', href })
	if (meta) state.meta = meta
	if (payload) state.payload = payload
	routeStore.next(state)

	if (!import.meta.env.SSR) {
		// Set preload state on app bootstrap
		preloadRouteObs.pipe(first()).subscribe()
		preloadStore.next({ type: 'popstate', href })
	}
}

export function openPage(pathname: string, params?: RouteParams, replace = false) {
	preloadStore.next({ params, pathname, type: replace ? 'replace' : 'push' })
}

// TODO: Add programmatic navigation
// redirectPage
