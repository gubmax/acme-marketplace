import react from '@vitejs/plugin-react'
import unocss from 'unocss/vite'
import { defineConfig, splitVendorChunkPlugin, type UserConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { generateRoutesManifest } from './plugins/vite-plugin-routes-manifest.js'

/**
 * @link https://vitejs.dev/config/
 */
export default defineConfig(({ ssrBuild }) => {
	const plugins = [
		tsconfigPaths({ root: '.' }),
		react(),
		unocss(),
		splitVendorChunkPlugin(),
		generateRoutesManifest(),
	]

	const ssrConfig: UserConfig = {
		plugins,
		publicDir: false,
		build: {
			outDir: './dist/server',
			rollupOptions: {
				input: ['./client/entries/app.server', './client/entries/error.server'],
			},
		},
	}

	const spaConfig: UserConfig = {
		plugins,
		publicDir: './client/public',
		build: {
			manifest: 'assets.manifest.json',
			outDir: './dist/client',
			rollupOptions: {
				input: ['./client/entries/app.client', './client/entries/error.client'],
			},
		},
	}

	return ssrBuild ? ssrConfig : spaConfig
})
