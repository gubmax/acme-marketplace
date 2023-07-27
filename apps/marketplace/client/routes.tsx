import { routes as routesManifest } from 'virtual:routes-manifest'

import NotFoundPage from './404.js'
import BaseLayout from './common/components/layouts/base/base-layout.js'
import type { DynamicModule } from './core/dynamic.js'
import { type CustomRouteObject, enhanceRoutes } from './core/enhance-routes.js'

// Pages by folder structure

const modules = import.meta.glob<DynamicModule>('/client/pages/**/*.tsx')

enhanceRoutes(modules, routesManifest)

// All routes

export const routes: CustomRouteObject[] = [
	{
		element: <BaseLayout />,
		children: [...routesManifest, { path: '*', element: <NotFoundPage /> }],
	},
]
