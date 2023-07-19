import { memo } from 'react'

import './header.css'

function Header() {
	return (
		<header className="m-header fixed" id="header" data-turbo-permanent>
			<nav className="m-header__navigation flex items-center mx-auto px-5 gap-5">
				<a className="link" href="/">
					Home
				</a>
				<a className="link" href="/about">
					About
				</a>
			</nav>
		</header>
	)
}

export default memo(Header)
