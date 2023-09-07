declare module 'virtual:routes-manifest' {
	interface ManifestRoute {
		id: string
		path: string
		static?: boolean
	}

	const routes: ManifestRoute[]
}
