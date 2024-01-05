import type { Meta, StoryObj } from '@storybook/react'

import TextField, { type TextFieldProps } from './text-field.js'

const meta: Meta<typeof TextField> = {
	title: 'components/form/text-field',
	component: TextField,
}

export default meta
type Story = StoryObj<typeof TextField>

// Basic

export const Basic: Story = {
	render: (args: TextFieldProps) => (
		<TextField {...args}>
			<TextField.Label>Login</TextField.Label>
			<TextField.Input defaultValue="someone@example.com" required />
			<TextField.Error>Invalid email</TextField.Error>
		</TextField>
	),
}
