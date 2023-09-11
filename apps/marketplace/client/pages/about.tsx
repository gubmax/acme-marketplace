import type { LoaderFunction, MetaFunction } from 'client/core/components/page.js'

export const meta: MetaFunction = () => ({ title: 'About · Acme' })

export const loader: LoaderFunction = () => ({ pageTitle: 'About' })

export default function AboutPage() {
	return (
		<>
			<div className="bg-outline rounded-lg h-40 mb-5" />
			<div className="bg-outline rounded-lg h-60" />
		</>
	)
}
