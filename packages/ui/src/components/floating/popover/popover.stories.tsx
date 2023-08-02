import type { Meta, StoryObj } from '@storybook/react'
import SettingsIcon from 'src/components/icons/settings-icon.js'

import { type PopoverOptions, usePopover } from '../../../hooks/use-popover.js'
import Button from '../../buttons/button/button.js'
import Menu from '../../menu/menu.js'
import Popover from './popover.js'

const meta: Meta<typeof Popover> = {
	title: 'components/floating/popover',
	component: Popover,
}

export default meta
type Story = StoryObj<typeof Popover>

function PopoverBase(props: { buttonText: string } & PopoverOptions) {
	const { buttonText, ...opts } = props
	const { context, refs, getFloatingProps, getReferenceProps } = usePopover({
		initialOpen: true,
		...opts,
	})

	return (
		<>
			<Button ref={refs.setReference} variant="tonal" {...getReferenceProps()}>
				{buttonText}
			</Button>
			<Popover ref={refs.setFloating} context={context} {...getFloatingProps()}>
				<Menu className="bg-background-tertiary rounded-md py-2">
					{Array.from({ length: 3 }).map((_, index) => (
						<Menu.Item
							key={index}
							className="hover:bg-background-tertiary-hover flex items-center gap-2 px-4 py-1"
						>
							<SettingsIcon className="fill-foreground-secondary" />
							<p>Label {index + 1}</p>
						</Menu.Item>
					))}
				</Menu>
			</Popover>
		</>
	)
}

// Basic

export const Basic: StoryObj = { render: () => <PopoverBase buttonText="Click me" /> }

// Placements

export const Placements: Story = {
	render: () => (
		<div className="flex flex-col gap-5">
			<PopoverBase placement="top" buttonText="Top" />
			<PopoverBase placement="left" buttonText="Left" />
			<PopoverBase placement="right" buttonText="Right" />
			<PopoverBase placement="bottom" buttonText="Bottom" />
		</div>
	),
}

// Overflow

export const Overflow: Story = {
	render: () => (
		<>
			<p className="text-secondary mb-2">overflow: hidden</p>
			<div className="border-secondary grid place-items-center overflow-hidden rounded-md border border-dashed p-5">
				<PopoverBase placement="bottom" buttonText="Click me" />
			</div>
		</>
	),
}
