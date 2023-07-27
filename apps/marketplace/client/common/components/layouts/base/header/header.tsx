import { memo } from 'react'
import { useStore } from '@nanostores/react'
import Button from 'ui/components/buttons/button/button.js'

import { pageStore } from 'client/common/stores/page-store.js'
import './header.css'

function Header() {
	const page = useStore(pageStore)

	return (
		<header className="m-header fixed  flex items-center mx-auto px-10 gap-5">
			<h1 className="text-title-lg">{page.title}</h1>
			<Button className="ml-auto">Sign In</Button>
		</header>
	)
}

export default memo(Header)
