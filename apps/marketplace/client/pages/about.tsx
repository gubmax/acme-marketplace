import type { MetaFunction, PayloadFunction } from 'client/core/components/page.js'

export const meta: MetaFunction = () => ({ title: 'About · Acme' })

export const payload: PayloadFunction = () => ({ pageTitle: 'About' })

export default function AboutPage() {
	return (
		<>
			<div className="bg-outline rounded-lg h-40 mb-5" />
			<div className="bg-outline rounded-lg h-60 mb-5" />
		</>
	)
}
