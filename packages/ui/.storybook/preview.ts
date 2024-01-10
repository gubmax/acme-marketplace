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
		layout: 'centered',
		options: {
			storySort: {
				order: ['overview', 'components', ['buttons', 'floating', 'form']],
			},
		},
	},
}

export default preview
