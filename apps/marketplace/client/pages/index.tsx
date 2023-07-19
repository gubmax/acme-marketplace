import type { MetaFunction } from 'client/core/components/modules'

export const meta: MetaFunction = () => ({ title: 'Acme' })

export default function HomePage() {
	return (
		<div>
			<h1 className="text-display-md">Home</h1>
		</div>
	)
}
