import { memo } from 'react'

import './header.css'

function Header() {
	return (
		<header className="m-header fixed" id="header">
			<nav className="m-header__navigation flex items-center mx-auto px-5 gap-5">
				<a className="ui-link" href="/">
					Home
				</a>
				<a className="ui-link" href="/about">
					About
				</a>
			</nav>
		</header>
	)
}

export default memo(Header)
