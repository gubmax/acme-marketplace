import type { Meta, StoryObj } from '@storybook/react'

import { cn } from '../helpers/class-names'

const meta: Meta = {
	title: 'Overview/Palette',
}

export default meta

function Color({ color, onColor }: { color: string; onColor?: string }) {
	return (
		<div className="relative">
			<span className="mb-3 text-body-lg text-secondary">{color.slice(3)}</span>
			<div className={cn(color, 'rounded-md h-12 w-28 flex justify-center items-center')}>
				{!!onColor && <span className={onColor}>{onColor.slice(5)}</span>}
			</div>
		</div>
	)
}

export const Palette: StoryObj = {
	render: () => (
		<div className="p-10 rounded-lg grid grid-cols-5 gap-5">
			<Color color="bg-primary" />
			<Color color="bg-secondary" />
			<Color color="bg-tertiary" />
			<Color color="bg-accent" onColor="text-on-accent" />
			<Color color="bg-surface" />
			<Color color="bg-container" />
			<Color color="bg-outline" />
		</div>
	),
}
