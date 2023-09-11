import { type ManifestRoute, routes as routesManifest } from 'virtual:routes-manifest'

import type { LoaderFunction, MetaFunction } from './components/page.js'
import { dynamic, type DynamicComponent, type DynamicModule } from './dynamic.js'

// Pages by folder structure

export interface RouteDescriptor {
	loader?: LoaderFunction
	meta?: MetaFunction
}

export type RouteModule = DynamicModule & RouteDescriptor

export const modules = import.meta.glob<RouteModule>('/client/pages/**/*.tsx')
export const notFoundModule = () => import('client/404.js')

// Add dynamic elements for preloading

export interface ClientRoute<P = unknown, E = never> extends ManifestRoute {
	Component: DynamicComponent<P, E>
	pattern: RegExp
}

// Page routes with extended type

export const routes: ClientRoute[] = []

for (const route of routesManifest) {
	const routePattern = route.path
		.replace(/[\s!#$()+,.:<=?[\\\]^{|}]/g, '\\$&')
		.replace(/\/\\:\w+\\\?/g, '/?([^/]*)')
		.replace(/\/\\:\w+/g, '/([^/]+)')
	const pattern = RegExp('^' + routePattern + '$', 'i')

	routes.push({ ...route, pattern, Component: dynamic(modules[`/${route.id}`]) })
}

// Not Found route

export const notFoundRoute = { Component: dynamic(notFoundModule) }
