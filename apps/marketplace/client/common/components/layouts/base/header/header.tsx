import { memo } from 'react'
import Button from 'ui/components/buttons/button/button.js'

import { useStore } from 'client/common/hooks/use-store.js'
import { routeStore } from 'client/core/models/router-model.js'
import './header.css'

function Header() {
	const route = useStore(routeStore)

	return (
		<header className="m-header fixed flex items-center mx-auto px-10 gap-5">
			<h1 className="text-title-lg">{route.payload?.pageTitle}</h1>
			<Button as="a" className="ml-auto" href="/login">
				Sign In
			</Button>
		</header>
	)
}

export default memo(Header)
