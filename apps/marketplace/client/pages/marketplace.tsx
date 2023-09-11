import type { LoaderFunction, MetaFunction } from 'client/core/components/page.js'

export const meta: MetaFunction = () => ({ title: 'Marketplace · Acme' })

export const loader: LoaderFunction = () => ({ pageTitle: 'Marketplace' })

export default function MarketplacePage() {
	return (
		<>
			<div className="bg-outline rounded-lg h-40 mb-5" />
			<div className="bg-outline rounded-lg h-60" />
		</>
	)
}
