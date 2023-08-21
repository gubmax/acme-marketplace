import { useCallback, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Button from '../../buttons/button/button.js'
import Dialog from '../../dialog/dialog.js'
import Modal from './modal.js'

const meta: Meta<typeof Modal> = {
	title: 'components/floating/modal',
	component: Modal,
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Basic: Story = {
	render: () => {
		const [open, setOpen] = useState(true)

		const showModal = useCallback(() => {
			setOpen(true)
		}, [setOpen])

		const hideModal = useCallback(() => {
			setOpen(false)
		}, [setOpen])

		return (
			<>
				<Button onClick={showModal}>Click me</Button>
				<Modal className="-mt-60" open={open} onOpenChange={hideModal}>
					<Dialog>
						<Dialog.Body>
							<h2 className="text-title-lg mb-2">Title</h2>
							<p>Subtitle</p>
						</Dialog.Body>
						<Dialog.Footer className="flex justify-end gap-3">
							<Button variant="tonal" size="lg" onClick={hideModal}>
								Cancel
							</Button>
							<Button variant="filled" size="lg" onClick={hideModal}>
								Submit
							</Button>
						</Dialog.Footer>
					</Dialog>
				</Modal>
			</>
		)
	},
}
