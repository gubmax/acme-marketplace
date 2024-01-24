import type { LoaderFunction, MetaFunction } from 'client/core/page.js'

export const meta: MetaFunction = () => ({ title: 'Marketplace · Acme' })

export const loader: LoaderFunction = () => ({ pageTitle: 'Marketplace' })

export default function MarketplacePage() {
	return (
		<>
			<div className="mb-10 grid h-80 grid-cols-[1fr_1fr] gap-5">
				<div className="bg-container row-start-1 row-end-3 rounded-lg" />
				<div className="bg-container rounded-lg" />
				<div className="bg-container rounded-lg" />
			</div>
			<div className="grid grid-cols-4 gap-5">
				{Array.from({ length: 8 }).map((_, index) => (
					<div key={index} className="bg-container h-60 rounded-lg" />
				))}
			</div>
		</>
	)
}
