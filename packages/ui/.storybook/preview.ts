import type { Preview } from '@storybook/react'

import { dark, light } from './themes'

import '../src/styles/index.css'
import 'virtual:uno.css'

const preview: Preview = {
	parameters: {
		controls: { expanded: true },
		actions: { argTypesRegex: '^on[A-Z].*' },
		backgrounds: { disable: true },
		darkMode: {
			current: 'dark',
			dark,
			light,
			stylePreview: true,
		},
		docs: { theme: dark },
		layout: 'centered',
		options: {
			storySort: {
				order: ['overview', 'components'],
			},
		},
	},
}

export default preview
