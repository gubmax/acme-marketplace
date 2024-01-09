import type { Meta, StoryObj } from '@storybook/react'

import Avatar, { type AvatarProps, type AvatarSize } from './avatar.js'

const meta: Meta<typeof Avatar> = {
	title: 'components/avatar',
	component: Avatar,
}

export default meta
type Story = StoryObj<typeof Avatar>

// Basic

export const Basic: Story = {
	render: (args: AvatarProps) => <Avatar {...args} />,
	args: { size: 'md' },
}

// Sizes

function SizeItem({ size }: { size: AvatarSize }) {
	return (
		<div className="flex flex-col">
			<h2 className="text-secondary my-2">{size}</h2>
			<div className="flex gap-2">
				<Avatar size={size} />
				<Avatar placeholder={false} size={size}>
					<img src="/favicon.svg" alt="User avatar" />
				</Avatar>
			</div>
		</div>
	)
}

export const Sizes: Story = {
	render: () => (
		<div className="flex flex-col gap-3">
			<SizeItem size="sm" />
			<SizeItem size="md" />
			<SizeItem size="lg" />
		</div>
	),
}
