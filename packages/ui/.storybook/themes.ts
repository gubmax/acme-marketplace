/**
 * @link https://storybook.js.org/docs/react/configure/theming
 */
import { create } from '@storybook/theming'

export const light = create({
	base: 'light',

	colorPrimary: '#161618',
	colorSecondary: '#454ce1',

	// UI
	appBg: '#fff',
	appContentBg: '#fff',
	appBorderColor: '#f0f0f0',
	appBorderRadius: 3,

	// Typography
	fontBase:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
	// fontCode: 'monospace',

	// Text colors
	textColor: '#161618',
	textInverseColor: '#dfdfd7',

	// Toolbar default and active colors
	barTextColor: '#161618',
	barSelectedColor: '#647dee',
	barBg: '#fff',

	// Form colors
	inputBg: '#f9f9f9',
	inputBorder: '#f0f0f0',
	inputTextColor: '#6d6d72',
	inputBorderRadius: 6,

	brandTitle: 'Acme UI',
	// brandUrl: 'http://localhost:3000',
	// brandTarget: '_self',
})

export const dark = create({
	base: 'dark',

	colorPrimary: '#dfdfd7',
	colorSecondary: '#646cff',

	// UI
	appBg: '#1e1f23',
	appContentBg: '#1e1f23',
	appBorderColor: '#2d2e33',
	appBorderRadius: 3,

	// Typography
	fontBase:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
	// fontCode: 'monospace',

	// Text colors
	textColor: '#dfdfd7',
	textInverseColor: '#161618',

	// Toolbar default and active colors
	barTextColor: '#dfdfd7',
	barSelectedColor: '#647dee',
	barBg: '#1e1f23',

	// Form colors
	inputBg: '#17181c',
	inputBorder: '#2d2e33',
	inputTextColor: '#9999a0',
	inputBorderRadius: 6,

	brandTitle: 'Acme UI',
	// brandUrl: 'http://localhost:3000',
	// brandTarget: '_self',
})
