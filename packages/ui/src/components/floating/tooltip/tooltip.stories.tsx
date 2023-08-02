import type { Meta, StoryObj } from '@storybook/react'

import { type TooltipOptions, useTooltip } from '../../../hooks/use-tooltip.js'
import Button from '../../buttons/button/button.js'
import Tooltip from './tooltip.js'

const meta: Meta<typeof Tooltip> = {
	title: 'components/floating/tooltip',
	component: Tooltip,
}

export default meta
type Story = StoryObj<typeof Tooltip>

function TooltipBase(props: { buttonText: string } & TooltipOptions) {
	const { buttonText, ...opts } = props

	const { context, refs, arrowRef, getFloatingProps, getReferenceProps } = useTooltip({
		initialOpen: true,
		...opts,
	})

	return (
		<>
			<Button ref={refs.setReference} variant="tonal" {...getReferenceProps()}>
				{buttonText}
			</Button>
			<Tooltip
				ref={refs.setFloating}
				className="px-3 py-2"
				arrowRef={arrowRef}
				context={context}
				{...getFloatingProps()}
			>
				<span className="text-title-md mb-1">Title</span>
				<p className="text-label-lg">The quick brown fox jumps over the lazy dog</p>
			</Tooltip>
		</>
	)
}

// Basic

export const Basic: Story = { render: () => <TooltipBase buttonText="Hover or focus me" /> }

// Placements

export const Placements: Story = {
	render: () => (
		<div className="flex flex-col gap-5">
			<TooltipBase placement="top" buttonText="Top" />
			<TooltipBase placement="left" buttonText="Left" />
			<TooltipBase placement="right" buttonText="Right" />
			<TooltipBase placement="bottom" buttonText="Bottom" />
		</div>
	),
}

// Overflow

export const Overflow: Story = {
	render: () => (
		<>
			<p className="text-secondary mb-2">overflow: hidden</p>
			<div className="border-secondary grid place-items-center overflow-hidden rounded-md border border-dashed p-5">
				<TooltipBase placement="bottom" buttonText="Hover or focus me" />
			</div>
		</>
	),
}
