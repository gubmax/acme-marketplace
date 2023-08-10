import BaseLayout from 'client/common/components/layouts/base/base-layout.js'
import type { MetaFunction, PayloadFunction } from 'client/core/components/page.js'

export const meta: MetaFunction = () => ({ title: 'Acme' })

export const payload: PayloadFunction = () => ({ pageTitle: 'Home' })

export default function HomePage() {
	return (
		<BaseLayout>
			<div className="mb-10 grid h-80 grid-cols-[1fr_1fr] gap-5">
				<div className="bg-outline row-start-1 row-end-3 rounded-lg" />
				<div className="bg-outline rounded-lg" />
				<div className="bg-outline rounded-lg" />
			</div>
			<div className="grid grid-cols-4 gap-5">
				{Array.from({ length: 8 }).map((_, index) => (
					<div key={index} className="bg-outline h-60 rounded-lg" />
				))}
			</div>
		</BaseLayout>
	)
}
