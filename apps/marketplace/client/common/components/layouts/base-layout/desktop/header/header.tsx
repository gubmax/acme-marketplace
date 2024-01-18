import { memo } from 'react'

import { useStore } from 'client/common/hooks/use-store.js'
import { routeStore } from 'client/core/models/router-model.js'
import AuthButton from 'client/features/auth/auth-button.js'
import './header.css'

function Header() {
	const route = useStore(routeStore)
	const { pageTitle } = route.loader

	return (
		<header className="m-header fixed flex items-center mx-auto px-10 gap-5">
			{pageTitle?.length && <h1 className="text-title-lg">{pageTitle}</h1>}
			<AuthButton />
		</header>
	)
}

export default memo(Header)
