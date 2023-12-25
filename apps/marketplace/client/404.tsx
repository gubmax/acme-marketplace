import NotFound from './common/components/not-found/not-found.js'
import type { LoaderFunction, MetaFunction } from './core/page.js'

export const meta: MetaFunction = () => ({ title: 'Page not found · Acme' })

export const loader: LoaderFunction = () => ({
	contentClassName: 'flex justify-center flex-col',
})

export default function NotFoundPage() {
	return <NotFound />
}
