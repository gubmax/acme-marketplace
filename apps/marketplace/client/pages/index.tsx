import Loader from '@acme/ui/components/loader/loader.js'

import { useDesktopView } from 'client/common/hooks/use-desktop-view.js'
import { dynamic } from 'client/core/dynamic.js'
import type { LoaderFunction, MetaFunction } from 'client/core/page.js'

export const meta: MetaFunction = () => ({ title: 'Discover · Acme' })

export const loader: LoaderFunction = () => ({ pageTitle: 'Discover' })

const UserTableDynamic = dynamic(() => import('client/features/user-table/user-table.js'))

export default function DiscoverPage() {
	const isDesktop = useDesktopView()

	return (
		<>
			<div className="mb-8 grid h-80 grid-cols-[1fr_1fr] gap-5">
				<div className="bg-outline row-start-1 row-end-3 rounded-lg" />
				<div className="bg-outline rounded-lg" />
				<div className="bg-outline rounded-lg" />
			</div>
			{isDesktop && (
				<>
					<h2 className="text-headline-lg mb-3">User data</h2>
					<UserTableDynamic fallback={<Loader className="block mx-auto" />} />
				</>
			)}
		</>
	)
}
