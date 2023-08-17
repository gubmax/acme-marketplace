import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import SettingsIcon from '../icons/settings-icon.js'
import Navigation from './navigation.js'

const meta: Meta<typeof Navigation> = {
	title: 'components/navigation',
	component: Navigation,
}

export default meta
type Story = StoryObj<typeof Navigation>

// Basic

export const Basic: Story = {
	render: () => {
		const [selectedIndex, setSelectedIndex] = useState(0)

		return (
			<Navigation as="nav">
				{Array.from({ length: 5 }).map((_, index) => {
					const active = selectedIndex === index

					return (
						<Navigation.Item
							as="button"
							key={index}
							className="text-body-lg w-52 items-center gap-2"
							active={active}
							onClick={() => setSelectedIndex(index)}
						>
							<SettingsIcon className={active ? 'fill-accent' : 'fill-secondary'} />
							Label {index + 1}
						</Navigation.Item>
					)
				})}
			</Navigation>
		)
	},
}
