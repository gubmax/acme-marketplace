import type { ChildrenProp } from 'ui/typings/children-prop.js'

import Footer from './footer/footer.js'
import Header from './header/header.js'
import Sidebar from './sidebar/sidebar.js'
import './base-layout.css'

function BaseLayout({ children }: ChildrenProp) {
	return (
		<div className="m-base-layout">
			<Sidebar />
			<div className="w-full">
				<Header />
				<main className="m-base-layout__main mx-auto px-10 pt-22 pb-20">{children}</main>
				<Footer />
			</div>
		</div>
	)
}

export default BaseLayout
