/// <reference types="ui/client" />
/// <reference types="vite-plugin-pwa/react" />

interface ManifestRoute {
	id: string
	path: string
	element: ReactNode
	pattern: RegExp
}

declare module 'virtual:routes-manifest' {
	export const routes: ManifestRoute[]
}

interface ImportMetaEnv {
	readonly VITE_SW_UPDATE_INTERVAL: number
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
