import { memo } from 'react'
import { useOutlet } from 'react-router-dom'

import Footer from './footer/footer.js'
import Header from './header/header.js'
import './base-layout.css'

function BaseLayout() {
	const outlet = useOutlet()
	return (
		<>
			<Header />
			<main className="m-main mx-auto px-5 pt-20">{outlet}</main>
			<Footer />
		</>
	)
}

export default memo(BaseLayout)
