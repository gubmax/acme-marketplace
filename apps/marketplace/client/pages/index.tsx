import Loader from '@acme/ui/components/loader/loader.js'

import GroupSlider from 'client/common/components/group-slider/group-slider.js'
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
				<div className="bg-container row-start-1 row-end-3 rounded-lg" />
				<div className="bg-container rounded-lg" />
				<div className="bg-container rounded-lg" />
			</div>
			<GroupSlider className="mb-5" headerSlot={<h2 className="text-headline-lg">Slider</h2>}>
				{Array.from({ length: 10 }).map((_, index) => (
					<div
						key={index}
						className="h-[28rem] bg-container rounded-lg flex items-center justify-center"
					>
						<span className="text-secondary text-headline-lg">{index + 1}</span>
					</div>
				))}
			</GroupSlider>
			{isDesktop && (
				<>
					<h2 className="text-headline-lg mb-3">User data</h2>
					<UserTableDynamic fallback={<Loader className="block mx-auto" />} />
				</>
			)}
		</>
	)
}
