import type { ReactNode } from 'react'
import type { RouteObject } from 'react-router-dom'
import { routes as routesManifest } from 'virtual:routes-manifest'

import BaseLayout from './common/components/layouts/base/base-layout.js'
import { dynamic, type DynamicComponentType, type DynamicModule } from './core/dynamic.js'
import NotFoundPage from './not-found.js'

// Pages by folder structure

const modules = import.meta.glob<DynamicModule>('/client/pages/**/*.tsx')

export type CustomRouteObject = RouteObject & {
	element?: ReactNode | DynamicComponentType
	children?: CustomRouteObject[]
}

function enhanceRoutes(arr: RouteObject[]): void {
	for (const route of arr) {
		if (route.id) {
			const DynamicPage = dynamic(modules[`/${route.id}`])
			route.element = <DynamicPage />
		}
		if (route.children) enhanceRoutes(route.children)
	}
}

enhanceRoutes(routesManifest)

// All routes

export const routes: CustomRouteObject[] = [
	{
		element: <BaseLayout />,
		children: [...routesManifest, { path: '*', element: <NotFoundPage /> }],
	},
]
