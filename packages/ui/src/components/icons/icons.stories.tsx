import type { ElementType } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import type { IconProps, IconSize } from '../../hocs/with-icon/with-icon.js'

type IconModules = Record<string, { default: ElementType }>

const icons: IconModules = import.meta.glob('./*.tsx', { eager: true })

const meta: Meta = {
	title: 'components/icon',
}

export default meta
type Story = StoryObj

const ExampleIcon = icons['./settings-icon.tsx'].default

// Basic

export const Basic: Story = {
	render: (args: IconProps) => <ExampleIcon {...args} />,
	args: { className: 'fill-primary' },
}

// Sizes

const SizeItem = ({ size }: { size: IconSize }) => (
	<div className="flex flex-col items-center">
		<h2 className="text-secondary my-3">{size}</h2>
		<ExampleIcon className="fill-primary" size={size} />
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

// Components

const ComponentItem = ({ path, el: Icon }: { path: string; el: ElementType }) => (
	<div className="flex flex-col items-center">
		<span className="text-secondary mb-3">{path.split('/')[1]?.slice(0, -4)}</span>
		<Icon />
	</div>
)

export const Components: Story = {
	render: () => (
		<div className="grid grid-cols-5 gap-3">
			{Object.entries(icons).map(([path, mod]) => (
				<ComponentItem key={path} path={path} el={mod.default} />
			))}
		</div>
	),
}
