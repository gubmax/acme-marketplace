import type { Meta, StoryObj } from '@storybook/react'

import Button from '../buttons/button/button.js'
import Dialog, { type DialogProps } from './dialog.js'

const meta: Meta<typeof Dialog> = {
	title: 'components/dialog',
	component: Dialog,
	argTypes: { children: { control: false } },
}

export default meta
type Story = StoryObj<typeof Dialog>

// Basic

export const Basic: Story = {
	render: (args: DialogProps) => <Dialog {...args} />,
	args: {
		children: (
			<>
				<Dialog.Body>
					<h2 className="text-title-lg mb-2">Title</h2>
					<p>Subtitle</p>
				</Dialog.Body>
				<Dialog.Footer className="flex justify-end gap-3">
					<Button variant="tonal" size="lg">
						Cancel
					</Button>
					<Button size="lg">Submit</Button>
				</Dialog.Footer>
			</>
		),
	},
}
