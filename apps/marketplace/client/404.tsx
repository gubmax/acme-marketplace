import type { MetaFunction } from './core/components/page.js'

export const meta: MetaFunction = () => ({ title: 'Page not found' })

function NotFoundPage() {
	return <p>Not found</p>
}

export default NotFoundPage
