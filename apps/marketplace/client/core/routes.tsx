import type { ReactElement } from 'react'
import { routes as routesManifest } from 'virtual:routes-manifest'

import { dynamic, type DynamicComponent, type DynamicModule, type DynamicProps } from './dynamic.js'

// Pages by folder structure
export const modules = import.meta.glob<DynamicModule>('/client/pages/**/*.tsx')
export const notFoundModule = () => import('client/404.js')

// Add dynamic elements for preloading

export interface ClientRoute<T = never> extends ManifestRoute {
	element: ReactElement<DynamicProps, DynamicComponent<unknown, T>>
}

for (const route of routesManifest) {
	const pattern = route.path
		.replace(/[\s!#$()+,.:<=?[\\\]^{|}]/g, '\\$&')
		.replace(/\/\\:\w+\\\?/g, '/?([^/]*)')
		.replace(/\/\\:\w+/g, '/([^/]+)')
	route.pattern = RegExp('^' + pattern + '$', 'i')

	const DynamicPage = dynamic(modules[`/${route.id}`])
	route.element = <DynamicPage />
}

// Page routes with extended type
export const routes: ClientRoute[] = routesManifest

// Not Found route
const NotFoundPage = dynamic(notFoundModule)
export const notFoundRoute = { element: <NotFoundPage /> }
