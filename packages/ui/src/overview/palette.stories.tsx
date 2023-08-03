import type { Meta, StoryObj } from '@storybook/react'
import { toast, ToastContainer } from 'src/components/toast/toast.js'

import { cn } from '../helpers/class-names.js'
import './palette.stories.css'

const meta: Meta = {
	title: 'overview/palette',
}

export default meta

const getColorVar = (text?: string) => text && `var(--color-${text})`

function copyToClipboard(text?: string) {
	if (!text) return

	void navigator.clipboard.writeText(text)

	toast({
		duration: 750,
		className: 'gap-1',
		content: (
			<>
				Copied!
				<span className="text-secondary">{text}</span>
			</>
		),
	})
}

function Color({ color }: { color: string }) {
	const colorText = color.slice(3)
	const colorVarText = getColorVar(colorText)

	return (
		<div className="relative flex gap-3 items-center shrink-0">
			<div
				className={cn(color, 'rounded-md h-16 w-16 ui-inner-shadow cursor-pointer')}
				onClick={() => copyToClipboard(colorVarText)}
			/>
			<p className="text-body-md text-secondary">{colorVarText}</p>
		</div>
	)
}

export const Palette: StoryObj = {
	render: () => (
		<div className="flex flex-col gap-10">
			<div>
				<p className="text-title-lg text-secondary mb-3">Text</p>
				<div className="rounded-lg grid grid-cols-3 gap-5">
					<Color color="bg-primary" />
					<Color color="bg-secondary" />
					<Color color="bg-accent" />
					<Color color="bg-on-accent" />
				</div>
			</div>
			<div>
				<p className="text-title-lg text-secondary mb-3">Surfaces</p>
				<div className="rounded-lg grid grid-cols-3 gap-5">
					<Color color="bg-surface" />
					<Color color="bg-container" />
					<Color color="bg-outline" />
					<Color color="bg-selected" />
				</div>
			</div>
			<ToastContainer />
		</div>
	),
}
