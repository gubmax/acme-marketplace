import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		globals: true,
		environment: 'happy-dom',
		typecheck: {
			enabled: true,
			include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
			tsconfig: 'tsconfig.web.json',
		},
	},
})
