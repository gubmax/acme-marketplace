import type { ReactNode } from 'react'
import type { RouteObject } from 'react-router-dom'

import { dynamic, type DynamicComponentType, type DynamicModule } from './dynamic.js'

export type CustomRouteObject = RouteObject & {
	element?: ReactNode | DynamicComponentType
	children?: CustomRouteObject[]
}

export function enhanceRoutes(
	modules: Record<string, () => Promise<DynamicModule<unknown>>>,
	arr: RouteObject[],
): void {
	for (const route of arr) {
		if (route.id) {
			const DynamicPage = dynamic(modules[`/${route.id}`])
			route.element = <DynamicPage />
		}
		if (route.children) enhanceRoutes(modules, route.children)
	}
}
