/// <reference types="ui/client" />

interface ManifestRoute {
	id: string
	path: string
	element: ReactNode
	pattern: RegExp
}

declare module 'virtual:routes-manifest' {
	export const routes: ManifestRoute[]
}
