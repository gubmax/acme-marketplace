import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import DoneIcon from '../icons/done-icon.js'
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
					<DoneIcon className="fill-secondary" />
					Label {index + 1}
				</Menu.Item>
			))}
		</Menu>
	),
}

// Interactive

export const Interactive: Story = {
	render: () => {
		const [selectedIndex, setSelectedIndex] = useState(0)

		return (
			<Menu as="nav">
				{Array.from({ length: 5 }).map((_, index) => {
					const active = selectedIndex === index

					return (
						<Menu.Item
							key={index}
							as="button"
							className="w-52 items-center gap-2"
							active={active}
							onClick={() => {
								setSelectedIndex(index)
							}}
						>
							<DoneIcon className={active ? 'fill-accent' : 'fill-secondary'} />
							Label {index + 1}
						</Menu.Item>
					)
				})}
			</Menu>
		)
	},
}
