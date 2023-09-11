import { cn } from 'ui/helpers/class-names.js'
import type { ChildrenProp } from 'ui/typings/children-prop.js'

import { useStore } from 'client/common/hooks/use-store.js'
import { routeStore } from 'client/core/models/router-model.js'
import Footer from './footer/footer.js'
import Header from './header/header.js'
import Sidebar from './sidebar/sidebar.js'
import './base-layout.css'

function BaseLayout({ children }: ChildrenProp) {
	const route = useStore(routeStore)
	const { contentClassName } = route.loader

	return (
		<div className="m-base-layout">
			<Sidebar />
			<div className="w-full">
				<Header />
				<main className={cn('m-base-layout__main mx-auto px-10 pt-22 pb-20', contentClassName)}>
					{children}
				</main>
				<Footer />
			</div>
		</div>
	)
}

export default BaseLayout
