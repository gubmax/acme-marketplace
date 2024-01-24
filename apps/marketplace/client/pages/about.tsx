import type { LoaderFunction, MetaFunction } from 'client/core/page.js'

export const meta: MetaFunction = () => ({ title: 'About · Acme' })

export const loader: LoaderFunction = () => ({ pageTitle: 'About' })

export default function AboutPage() {
	return (
		<>
			<div className="bg-container rounded-lg h-40 mb-5" />
			<div className="bg-container rounded-lg h-60" />
		</>
	)
}
