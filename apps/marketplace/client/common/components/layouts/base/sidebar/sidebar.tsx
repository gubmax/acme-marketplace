import { memo } from 'react'

import './sidebar.css'

function Sidebar() {
	return (
		<aside className="m-sidebar bg-container">
			<nav className="py-5 flex flex-col items-center mx-auto px-10 gap-5">
				<a className="ui-link" href="/">
					Home
				</a>
				<a className="ui-link" href="/about">
					About
				</a>
			</nav>
		</aside>
	)
}

export default memo(Sidebar)
