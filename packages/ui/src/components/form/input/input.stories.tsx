import type { Meta, StoryObj } from '@storybook/react'

import Input, { type InputProps } from './input.js'

const meta: Meta<typeof Input> = {
	title: 'components/form/input',
	component: Input,
}

export default meta
type Story = StoryObj<typeof Input>

// Basic

export const Basic: Story = {
	render: (args: InputProps) => <Input {...args} />,
	args: { type: 'email', name: 'email', defaultValue: 'someone@example.com' },
}
