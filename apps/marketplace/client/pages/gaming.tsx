import type { LoaderFunction, MetaFunction } from 'client/core/page.js'

export const meta: MetaFunction = () => ({ title: 'Gaming · Acme' })

export const loader: LoaderFunction = () => ({ pageTitle: 'Gaming' })

export default function GamingPage() {
	return (
		<div className="grid h-80 grid-cols-[1fr_1fr] gap-5">
			<div className="bg-outline row-start-1 row-end-3 rounded-lg" />
			<div className="bg-outline rounded-lg" />
			<div className="bg-outline rounded-lg" />
		</div>
	)
}
