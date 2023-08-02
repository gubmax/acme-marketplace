import { useCallback } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { usePopover } from '../../../hooks/use-popover.js'
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
		const { context, refs, getFloatingProps, getReferenceProps, setOpen } = usePopover({
			initialOpen: true,
		})

		const hidePopup = useCallback(() => setOpen(false), [setOpen])

		return (
			<>
				<Button ref={refs.setReference} {...getReferenceProps()}>
					Click me
				</Button>
				<Modal ref={refs.setFloating} className="-mt-60" context={context} {...getFloatingProps()}>
					<Dialog>
						<Dialog.Body>
							<h2 className="text-title-1 mb-2">Title</h2>
							<p>Subtitle</p>
						</Dialog.Body>
						<Dialog.Footer className="flex justify-end gap-2">
							<Button variant="tonal" size="lg" onClick={hidePopup}>
								Cancel
							</Button>
							<Button variant="filled" size="lg" onClick={hidePopup}>
								Submit
							</Button>
						</Dialog.Footer>
					</Dialog>
				</Modal>
			</>
		)
	},
}
