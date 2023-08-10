import fs from 'node:fs'

import type { Plugin } from 'vite'

const PATH_ROUTES_FOLDER = 'client/pages'

export interface ManifestRoute {
	id: string
	path: string
	static?: boolean
}

function generateRoutes(routes: ManifestRoute[], rootFolder: string, prefix = '/') {
	const direntArr = fs.readdirSync(`./${rootFolder}${prefix}`, { withFileTypes: true })
	const folderArr: fs.Dirent[] = []

	for (const dirent of direntArr) {
		if (dirent.isDirectory()) {
			folderArr.push(dirent)
			continue
		}

		const { name } = dirent
		const id = `${rootFolder}${prefix}${name}`

		const end = name.endsWith('index.tsx') ? name.indexOf('index.tsx') - 1 : name.indexOf('.tsx')
		const subpath = name.substring(0, end)

		routes.push({
			id,
			path: `${prefix}${subpath}`,
			static: true, // TODO: add condition for preload routes
		})
	}

	for (const { name } of folderArr) {
		const currentName = `${prefix}${name}`
		generateRoutes(routes, rootFolder, `${currentName}/`)
	}
}

export function generateRoutesManifest(): Plugin {
	const virtualModuleId = 'virtual:routes-manifest'
	const resolvedVirtualModuleId = '\0' + virtualModuleId
	let routes: ManifestRoute[] = []

	return {
		name: 'routes-manifest',
		enforce: 'pre',
		resolveId(id) {
			if (id === virtualModuleId) return resolvedVirtualModuleId
		},
		configureServer(server) {
			server.watcher.on('all', (eventName, path) => {
				if (eventName !== 'change' && path.includes(`/${PATH_ROUTES_FOLDER}`)) {
					const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId)
					if (mod) void server.reloadModule(mod)
				}
			})
		},
		load(id) {
			if (id === resolvedVirtualModuleId) {
				routes = []
				generateRoutes(routes, PATH_ROUTES_FOLDER)
				return `export const routes = ${JSON.stringify(routes)}`
			}
		},
		closeBundle() {
			fs.mkdirSync('./dist/server', { recursive: true })
			fs.writeFileSync('./dist/server/routes.manifest.json', JSON.stringify(routes))
		},
	}
}
