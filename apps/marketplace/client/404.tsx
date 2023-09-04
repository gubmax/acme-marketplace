import BaseLayout from './common/components/layouts/base/base-layout.js'
import NotFound from './common/components/not-found/not-found.js'
import type { MetaFunction } from './core/components/page.js'

export const meta: MetaFunction = () => ({ title: 'Page not found · Acme' })

export default function NotFoundPage() {
	return (
		<BaseLayout contentClassName="flex justify-center flex-col">
			<NotFound />
		</BaseLayout>
	)
}
