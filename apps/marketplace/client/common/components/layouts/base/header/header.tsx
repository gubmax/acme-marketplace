import { memo } from 'react'
import Button from 'ui/components/buttons/button/button.js'

import { useStore } from 'client/common/hooks/use-store.js'
import { pageStore } from 'client/common/models/page-model.js'
import './header.css'

function Header() {
	const page = useStore(pageStore)

	return (
		<header className="m-header fixed flex items-center mx-auto px-10 gap-5">
			<h1 className="text-title-lg">{page.title}</h1>
			<Button as="a" className="ml-auto" href="/login">
				Sign In
			</Button>
		</header>
	)
}

export default memo(Header)
