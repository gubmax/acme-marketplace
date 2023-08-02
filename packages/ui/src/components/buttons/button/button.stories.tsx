import type { Meta, StoryObj } from '@storybook/react'

import SettingsIcon from '../../../components/icons/settings-icon.js'
import Button, { type ButtonProps, type ButtonSize, type ButtonVariant } from './button.js'

const meta: Meta<typeof Button> = {
	title: 'components/buttons/button',
	component: Button,
}

export default meta
type Story = StoryObj<typeof Button<'button'>>

// Basic

export const Basic: Story = {
	render: (args: ButtonProps) => <Button {...args} />,
	args: { variant: 'filled', children: 'Label', loading: false, disabled: false },
}

// Sizes

const SizeItem = ({ size }: { size: ButtonSize }) => (
	<div className="flex flex-col">
		<h2 className="text-secondary my-3">{size}</h2>
		<Button size={size}>Label</Button>
	</div>
)

export const Sizes: Story = {
	render: () => (
		<div className="flex gap-5">
			<SizeItem size="md" />
			<SizeItem size="lg" />
		</div>
	),
}

// Variants

const BUTTON_VARIANTS: ButtonVariant[] = ['filled', 'tonal']

export const Variants: Story = {
	render: (args) => (
		<div className="flex flex-col items-start gap-4">
			{BUTTON_VARIANTS.map((variant, key) => (
				<div key={key}>
					<h2 className="text-secondary my-3">{variant}</h2>
					<div className="flex gap-3">
						<Button variant={variant} {...args}>
							Label
						</Button>
						<Button variant={variant} loading {...args}>
							Label
						</Button>
						<Button className="gap-2" variant={variant} {...args}>
							<SettingsIcon />
							Label
						</Button>
						<Button className="gap-2" variant={variant} {...args}>
							<SettingsIcon />
							Label
							<SettingsIcon />
						</Button>
						<Button variant={variant} disabled {...args}>
							Label
						</Button>
					</div>
				</div>
			))}
		</div>
	),
}
