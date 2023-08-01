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

function Color({ color, onColor }: { color: string; onColor?: string }) {
	const colorText = color.slice(3)
	const onColorText = onColor && onColor.slice(5)
	const colorVarText = getColorVar(colorText)
	const onColorVarText = getColorVar(onColorText)

	return (
		<div className="relative flex gap-3 items-center shrink-0">
			<div
				className={cn(color, 'flex-col rounded-md h-20 w-28 flex ui-inner-shadow overflow-hidden')}
			>
				<button
					type="button"
					className="ui-color-btn flex cursor-pointer min-h-1/2 h-full"
					onClick={() => copyToClipboard(colorVarText)}
				/>
				{!!onColor && (
					<button
						type="button"
						className={`ui-on-color-btn flex items-center justify-center cursor-pointer min-h-1/2 text-${onColorText}`}
						onClick={() => copyToClipboard(onColorVarText)}
					>
						<span className={onColor}>{onColorText}</span>
					</button>
				)}
			</div>
			<div className="flex flex-col justify-around h-full text-secondary">
				<p className="text-body-md">{colorVarText}</p>
				{!!onColor && <p className="text-body-md">{onColorVarText}</p>}
			</div>
		</div>
	)
}

export const Palette: StoryObj = {
	render: () => (
		<div className="p-10 rounded-lg grid grid-cols-2 gap-5">
			<Color color="bg-primary" />
			<Color color="bg-secondary" />
			<Color color="bg-tertiary" />
			<Color color="bg-accent" onColor="text-on-accent" />
			<Color color="bg-surface" />
			<Color color="bg-container" />
			<Color color="bg-outline" />
			<ToastContainer />
		</div>
	),
}
