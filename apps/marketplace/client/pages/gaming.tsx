import BaseLayout from 'client/common/components/layouts/base/base-layout.js'
import type { MetaFunction, PayloadFunction } from 'client/core/components/page.js'

export const meta: MetaFunction = () => ({ title: 'Gaming · Acme' })

export const payload: PayloadFunction = () => ({ pageTitle: 'Gaming' })

export default function GamingPage() {
	return (
		<BaseLayout>
			<div className="grid h-80 grid-cols-[1fr_1fr] gap-5">
				<div className="bg-outline row-start-1 row-end-3 rounded-lg" />
				<div className="bg-outline rounded-lg" />
				<div className="bg-outline rounded-lg" />
			</div>
		</BaseLayout>
	)
}
