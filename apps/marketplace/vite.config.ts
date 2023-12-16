import react from '@vitejs/plugin-react-swc'
import unoCSS from 'unocss/vite'
import { defineConfig, splitVendorChunkPlugin, type UserConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

import { generateRoutesManifest } from './plugins/vite-plugin-routes-manifest/index.js'

/**
 * @link https://vitejs.dev/config/
 */
export default defineConfig(({ mode, isSsrBuild }) => {
	const isDev = mode === 'development'

	const plugins = [
		tsconfigPaths({ root: '.' }),
		react(),
		// @ts-expect-error Wrong export for NodeNext modules
		unoCSS(),
		splitVendorChunkPlugin(),
		generateRoutesManifest(),
		VitePWA({
			registerType: 'prompt',
			strategies: 'generateSW',
			manifest: {
				background_color: '#17181c',
				description:
					'The largest digital marketplace. Buy, sell, and discover exclusive digital items.',
				display: 'minimal-ui',
				id: '/',
				name: 'ACME Marketplace',
				short_name: 'ACME',
				theme_color: '#17181c',
			},
			workbox: {
				navigateFallback: '',
				navigateFallbackDenylist: [/^\/storybook/],
			},
			devOptions: {
				navigateFallback: '',
				enabled: isDev,
				type: 'module',
				suppressWarnings: true,
			},
		}),
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

	return isSsrBuild ? ssrConfig : clientConfig
})
