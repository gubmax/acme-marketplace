import type { MetaFunction } from './core/components/modules'

export const meta: MetaFunction = () => ({ title: 'Page not found' })

function NotFoundPage() {
	return <p>Not found</p>
}

export default NotFoundPage
