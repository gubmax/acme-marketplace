import BaseLayout from 'client/common/components/layouts/base/base-layout.js'
import type { MetaFunction, PayloadFunction } from 'client/core/components/page.js'

export const meta: MetaFunction = () => ({ title: 'Marketplace · Acme' })

export const payload: PayloadFunction = () => ({ pageTitle: 'Marketplace' })

export default function MarketplacePage() {
	return (
		<BaseLayout>
			<div className="bg-outline rounded-lg h-40 mb-5" />
			<div className="bg-outline rounded-lg h-60" />
		</BaseLayout>
	)
}
