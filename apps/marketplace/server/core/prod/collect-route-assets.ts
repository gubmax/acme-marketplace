import type { RouteMatch } from 'react-router-dom'
import type { Manifest } from 'vite'

import type { Route } from 'plugins/vite-plugin-routes-manifest.js'
import type { RenderContext } from '../render-page.js'
import { getAssetProps } from './get-asset-props.js'

export interface RenderAssets {
	links: Array<Record<string, unknown>>
	styles: Array<Record<string, unknown>>
	scripts: Array<Record<string, unknown>>
}

function collectByManifest(manifest: Manifest, path: string): RenderAssets {
	const assetsAcc: RenderAssets = { links: [], styles: [], scripts: [] }
	const importedModules = new Set<string>()

	const collect = (assetPath: string) => {
		if (importedModules.has(assetPath)) return

		importedModules.add(assetPath)

		const { isEntry, file, css = [], assets = [], imports = [] } = manifest[assetPath]

		for (const url of [file, ...css, ...assets]) {
			const link = getAssetProps(`/${url}`, isEntry)
			if (link) {
				if (url.endsWith('.js')) assetsAcc.scripts.push(link)
				else assetsAcc.links.push(link)
			}
		}

		for (const importPath of imports) collect(importPath)
	}

	collect(path)

	return assetsAcc
}

export function collectRouteAssets(
	renderContext: RenderContext,
	assetsManifest: Manifest,
	matches: Array<RouteMatch<string, Route>>,
	entryPath: string,
) {
	// Entry

	const commonAssets = collectByManifest(assetsManifest, entryPath)
	renderContext.links.push(...commonAssets.links)
	renderContext.scripts.push(...commonAssets.scripts)

	// Routes

	for (const match of matches) {
		const routeAssets = collectByManifest(assetsManifest, match.route.id)
		renderContext.links.push(...routeAssets.links)
		renderContext.scripts.push(...routeAssets.scripts)
	}
}
