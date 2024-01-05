import type { Meta, StoryObj } from '@storybook/react'

import Button from '../buttons/button/button.js'
import TextField from './text-field/text-field.js'

const meta: Meta<typeof TextField> = {
	title: 'components/form',
	component: TextField,
}

export default meta
type Story = StoryObj<typeof TextField>

// Basic

export const Basic: Story = {
	render: () => (
		<form
			className="flex flex-col gap-5 w-[320px]"
			onSubmit={(event) => {
				event.preventDefault()
			}}
		>
			<TextField>
				<TextField.Label>Login</TextField.Label>
				<TextField.Input name="login" defaultValue="admin" required />
				<TextField.Error>Invalid email</TextField.Error>
			</TextField>
			<TextField>
				<TextField.Label>Password</TextField.Label>
				<TextField.Input type="password" name="password" defaultValue="admin" required />
			</TextField>
			<Button type="submit">Submit</Button>
		</form>
	),
}
