import BaseLayout from 'client/common/components/layouts/base/base-layout.js'
import type { MetaFunction, PayloadFunction } from 'client/core/components/page.js'

export const meta: MetaFunction = () => ({ title: 'Help · Acme' })

export const payload: PayloadFunction = () => ({ pageTitle: 'Help' })

export default function HelpPage() {
	return (
		<BaseLayout>
			<div className="bg-outline rounded-lg h-40 mb-5" />
			<div className="bg-outline rounded-lg h-60 mb-5" />
			<div className="bg-outline rounded-lg h-40" />
		</BaseLayout>
	)
}
