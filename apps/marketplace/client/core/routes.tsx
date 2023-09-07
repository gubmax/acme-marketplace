import type { ReactElement } from 'react'
import { type ManifestRoute, routes as routesManifest } from 'virtual:routes-manifest'

import { dynamic, type DynamicComponent, type DynamicModule, type DynamicProps } from './dynamic.js'

// Pages by folder structure

export const modules = import.meta.glob<DynamicModule>('/client/pages/**/*.tsx')
export const notFoundModule = () => import('client/404.js')

// Add dynamic elements for preloading

export interface ClientRoute<T = never> extends ManifestRoute {
	element: ReactElement<DynamicProps, DynamicComponent<unknown, T>>
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

	const DynamicPage = dynamic(modules[`/${route.id}`])
	const element = <DynamicPage />

	routes.push({ ...route, pattern, element })
}

// Not Found route

const NotFoundPage = dynamic(notFoundModule)
export const notFoundRoute = { element: <NotFoundPage /> }
