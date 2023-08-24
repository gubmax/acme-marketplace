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
			emptyOutDir: false,
			outDir: './dist/server',
			rollupOptions: { input: ['./client/entry.server'] },
		},
	}

	const clientConfig: UserConfig = {
		plugins,
		publicDir: './client/public',
		build: {
			emptyOutDir: false,
			manifest: 'assets.manifest.json',
			outDir: './dist/client',
			rollupOptions: { input: ['./client/entry.client'] },
		},
	}

	return ssrBuild ? ssrConfig : clientConfig
})
