import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
	title: 'Overview/Typography',
}

export default meta

export const Typography: StoryObj = {
	render: () => (
		<div className="flex flex-col gap-4">
			<span className="text-display-lg">Display Large</span>
			<span className="text-display-md">Display Medium</span>
			<span className="text-display-sm">Display Small</span>
			<span className="text-headline-lg">Headline Large</span>
			<span className="text-headline-md">Headline Medium</span>
			<span className="text-headline-sm">Headline Small</span>
			<span className="text-title-lg">Title Large</span>
			<span className="text-title-md">Title Medium</span>
			<span className="text-title-sm">Title Small</span>
			<span className="text-label-lg">Label Large</span>
			<span className="text-label-md">Label Medium</span>
			<span className="text-label-sm">Label Small</span>
			<span className="text-body-lg">Body Large</span>
			<span className="text-body-md">Body Medium</span>
			<span className="text-body-sm">Body Small</span>
		</div>
	),
}
