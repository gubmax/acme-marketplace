import BaseLayout from './common/components/layouts/base/base-layout.js'
import type { MetaFunction } from './core/components/page.js'

export const meta: MetaFunction = () => ({ title: 'Page not found' })

export default function NotFoundPage() {
	return (
		<BaseLayout>
			<p>Not found</p>
		</BaseLayout>
	)
}
