import type { Meta, StoryObj } from '@storybook/react'

import Button, { type ButtonProps } from './button.js'

const meta: Meta<typeof Button> = {
	title: 'Components/button',
	component: Button,
} as Meta<typeof Button>

export default meta
type Story = StoryObj<typeof Button>

// Basic

export const basic: Story = {
	render: (args: ButtonProps) => <Button {...args} />,
	args: { children: 'Label' },
}
