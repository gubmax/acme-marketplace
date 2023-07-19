import type { MetaFunction } from 'client/core/components/modules'

const PAGE_TITLE = 'About'

export const meta: MetaFunction = () => ({ title: PAGE_TITLE })

export default function AboutPage() {
	return (
		<div>
			<h1 className="text-display-md">{PAGE_TITLE}</h1>
			<p>The quick brown fox jumps over the lazy dog.</p>
		</div>
	)
}
