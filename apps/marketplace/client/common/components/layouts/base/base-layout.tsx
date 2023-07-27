import { memo } from 'react'
import { useOutlet } from 'react-router-dom'

import Footer from './footer/footer.js'
import Header from './header/header.js'
import Sidebar from './sidebar/sidebar.js'
import './base-layout.css'

function BaseLayout() {
	const outlet = useOutlet()

	return (
		<div className="m-base-layout">
			<Sidebar />
			<div className="w-full">
				<Header />
				<main className="m-base-layout__main mx-auto px-10 pt-22 pb-20">{outlet}</main>
				<Footer />
			</div>
		</div>
	)
}

export default memo(BaseLayout)
