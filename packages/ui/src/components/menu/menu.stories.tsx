import type { Meta, StoryObj } from '@storybook/react'

import SettingsIcon from '../icons/settings-icon.js'
import Menu from './menu.js'

const meta: Meta<typeof Menu> = {
	title: 'components/menu',
	component: Menu,
}

export default meta
type Story = StoryObj<typeof Menu>

// Basic

export const Basic: Story = {
	render: () => (
		<Menu as="nav">
			{Array.from({ length: 5 }).map((_, index) => (
				<Menu.Item key={index} as="button" className="w-52 items-center gap-2">
					<SettingsIcon className="fill-secondary" />
					Label {index + 1}
				</Menu.Item>
			))}
		</Menu>
	),
}
