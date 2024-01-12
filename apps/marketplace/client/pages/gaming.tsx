import type { LoaderFunction, MetaFunction } from 'client/core/page.js'

export const meta: MetaFunction = () => ({ title: 'Gaming · Acme' })

export const loader: LoaderFunction = () => ({ pageTitle: 'Gaming' })

export default function GamingPage() {
	return (
		<div className="grid grid-cols-4 gap-5">
			{Array.from({ length: 12 }).map((_, index) => (
				<div key={index} className="bg-outline h-80 rounded-lg" />
			))}
		</div>
	)
}
