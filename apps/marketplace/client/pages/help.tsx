import type { LoaderFunction, MetaFunction } from 'client/core/page.js'

export const meta: MetaFunction = () => ({ title: 'Help · Acme' })

export const loader: LoaderFunction = () => ({ pageTitle: 'Help' })

export default function HelpPage() {
	return (
		<>
			<div className="bg-outline rounded-lg h-40 mb-5" />
			<div className="bg-outline rounded-lg h-60 mb-5" />
			<div className="bg-outline rounded-lg h-40" />
		</>
	)
}
