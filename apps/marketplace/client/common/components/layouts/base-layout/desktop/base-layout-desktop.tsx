import { cn } from '@acme/ui/helpers/class-names.js'
import type { ChildrenProp } from '@acme/ui/typings/children-prop.js'

import { useStore } from 'client/common/hooks/use-store.js'
import { routerModel } from 'client/core/router.js'
import Footer from './footer/footer.js'
import Header from './header/header.js'
import Sidebar from './sidebar/sidebar.js'
import './base-layout-desktop.css'

function BaseLayoutDesktop({ children }: ChildrenProp) {
	const route = useStore(routerModel.routeStore)
	const { contentClassName } = route.loader

	return (
		<div className="m-base-layout-desktop">
			<Sidebar />
			<Header />
			<main
				className={cn(
					'm-base-layout-desktop__main w-full mx-auto px-10 pt-22 pb-20',
					contentClassName,
				)}
			>
				{children}
			</main>
			<Footer />
		</div>
	)
}

export default BaseLayoutDesktop
