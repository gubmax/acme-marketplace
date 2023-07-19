import type { Manifest, ModuleNode } from 'vite'

export interface RenderAssets {
	links: Array<Record<string, unknown>>
	styles: Array<Record<string, unknown>>
	scripts: Array<Record<string, unknown>>
}

export default class AssetCollectorService {
	private getFileProps(
		file: string,
		isEntry = false,
		module?: ModuleNode,
	): Record<string, unknown> | null {
		if (file.endsWith('.js')) {
			if (isEntry) return { type: 'module', crossOrigin: '', src: file }
			return { rel: 'modulepreload', crossOrigin: '', href: file }
		} else if (file.endsWith('.css')) {
			if (!isEntry && module) {
				const content = module.ssrModule?.default as string | object
				return typeof content !== 'string'
					? null
					: { type: 'text/css', 'data-vite-dev-id': module.id, content }
			}
			return { rel: 'stylesheet', crossOrigin: '', href: file }
		} else if (file.endsWith('.woff')) {
			return { rel: 'preload', href: file, as: 'font', type: 'font/woff', crossorigin: '' }
		} else if (file.endsWith('.woff2')) {
			return { rel: 'preload', href: file, as: 'font', type: 'font/woff2', crossorigin: '' }
		} else if (file.endsWith('.gif')) {
			return { rel: 'preload', href: file, as: 'image', type: 'image/gif' }
		} else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
			return { rel: 'preload', href: file, as: 'image', type: 'image/jpeg' }
		} else if (file.endsWith('.png'))
			return { rel: 'preload', href: file, as: 'image', type: 'image/png' }
		else return null
	}

	collectByModule(module?: ModuleNode): RenderAssets {
		const assetsAcc: RenderAssets = { links: [], styles: [], scripts: [] }

		if (!module) return assetsAcc

		const importedModules = new Set<string>()

		const collect = (assetModule: ModuleNode) => {
			if (!assetModule.id || importedModules.has(assetModule.id)) return

			importedModules.add(assetModule.id)
			if (assetModule.file?.includes('.css')) {
				const link = this.getFileProps(assetModule.url, false, assetModule)
				if (link) assetsAcc.styles.push(link)
			}

			assetModule.importedModules.forEach((importedMod) => collect(importedMod))
		}

		collect(module)

		return assetsAcc
	}

	collectByManifest(manifest: Manifest, path: string): RenderAssets {
		const assetsAcc: RenderAssets = { links: [], styles: [], scripts: [] }
		const importedModules = new Set<string>()

		const collect = (assetPath: string) => {
			if (importedModules.has(assetPath)) return

			importedModules.add(assetPath)

			const { isEntry, file, css = [], assets = [], imports = [] } = manifest[assetPath]

			for (const url of [file, ...css, ...assets]) {
				const link = this.getFileProps(`/${url}`, isEntry)
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
}
