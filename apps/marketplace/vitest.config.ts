import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'

import viteConfig from './vite.config.js'

export default defineConfig((configEnv) =>
	mergeConfig(viteConfig(configEnv), {
		test: {
			globals: true,
			environment: 'happy-dom',
		},
	}),
)
