import type { LoaderFunction, MetaFunction } from 'client/core/page.js'
import UserTable from 'client/features/user-table/user-table.js'

export const meta: MetaFunction = () => ({ title: 'Discover · Acme' })

export const loader: LoaderFunction = () => ({ pageTitle: 'Discover' })

export default function DiscoverPage() {
	return (
		<>
			<div className="mb-8 grid h-80 grid-cols-[1fr_1fr] gap-5">
				<div className="bg-outline row-start-1 row-end-3 rounded-lg" />
				<div className="bg-outline rounded-lg" />
				<div className="bg-outline rounded-lg" />
			</div>
			<h2 className="text-headline-lg mb-3">User data</h2>
			<UserTable />
		</>
	)
}
