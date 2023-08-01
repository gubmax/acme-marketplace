import type { Meta, StoryObj } from '@storybook/react'

import Loader, { type LoaderProps, type LoaderSize } from './loader.js'

const meta: Meta<typeof Loader> = {
	title: 'components/loader',
	component: Loader,
}

export default meta
type Story = StoryObj<typeof Loader>

// Basic

export const Basic: Story = {
	render: (args: LoaderProps) => <Loader {...args} />,
	args: { className: 'text-primary' },
}

// Sizes

const SizeItem = ({ size }: { size: LoaderSize }) => (
	<div className="flex flex-col items-center">
		<h2 className="text-secondary my-4">{size}</h2>
		<Loader className="fill-primary" size={size} />
	</div>
)

export const Sizes: Story = {
	render: () => (
		<div className="flex gap-5">
			<SizeItem size="sm" />
			<SizeItem size="md" />
		</div>
	),
}
