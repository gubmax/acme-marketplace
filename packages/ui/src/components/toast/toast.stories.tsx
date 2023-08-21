/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useEffectOnce } from 'src/hooks/use-effect-once.js'

import Button from '../buttons/button/button.js'
import { toast, ToastContainer } from './toast.js'

const meta: Meta<typeof ToastContainer> = {
	title: 'components/toast',
}

export default meta
type Story = StoryObj<typeof ToastContainer>

const COMMON_PROPS = {
	duration: Infinity,
	content: <div>Successfully toasted!</div>,
}

export const Basic: Story = {
	render: () => {
		const handleClick = useCallback(() => {
			toast(COMMON_PROPS)
		}, [])

		useEffectOnce(() => {
			toast(COMMON_PROPS)
		})

		return (
			<>
				<Button onClick={handleClick}>Click me</Button>
				<ToastContainer />
			</>
		)
	},
}
