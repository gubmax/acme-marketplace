import type { Meta, StoryObj } from '@storybook/react'

import Button from '../buttons/button/button.js'
import Input from './input/input.js'
import TextField from './text-field.js'

const meta: Meta<typeof TextField> = {
	title: 'components/form',
	component: TextField,
}

export default meta
type Story = StoryObj<typeof TextField>

// Basic

export const Basic: Story = {
	render: () => (
		<form className="flex flex-col gap-5">
			<div>
				<label className="block text-label-lg mb-2">Login</label>
				<Input type="text" name="login" defaultValue="admin" required />
			</div>
			<div>
				<label className="block text-label-lg mb-2">Password</label>
				<Input type="password" name="password" defaultValue="admin" required />
			</div>
			<Button type="submit">Submit</Button>
		</form>
	),
}
