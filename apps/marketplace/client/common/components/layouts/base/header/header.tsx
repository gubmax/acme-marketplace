import { memo, useCallback, useMemo } from 'react'
import { produce } from 'immer'
import Button from 'ui/components/buttons/button/button.js'

import { useStore } from 'client/common/hooks/use-store.js'
import { openPage, routeStore } from 'client/core/models/router-model.js'
import AuthModal from 'client/features/auth/auth-modal.js'
import './header.css'

const MODAL_PARAM = 'modal'
const MODAL_VALUE = 'login'

function Header() {
	const route = useStore(routeStore)
	const { pageTitle } = route.loader

	const modalHref = useMemo(() => {
		const searchParams = new URLSearchParams(route.params)
		searchParams.set(MODAL_PARAM, MODAL_VALUE)
		return route.pathname + '?' + searchParams.toString()
	}, [route])

	const hideModal = useCallback(() => {
		const newParams = produce(route.params, (draft) => {
			delete draft.modal
		})
		openPage(route.pathname, newParams)
	}, [route])

	return (
		<header className="m-header fixed flex items-center mx-auto px-10 gap-5">
			{pageTitle?.length && <h1 className="text-title-lg">{pageTitle}</h1>}
			<Button as="a" className="ml-auto" href={modalHref}>
				Sign In
			</Button>
			<AuthModal
				open={route.params[MODAL_PARAM] === MODAL_VALUE}
				onOpenChange={hideModal}
				onSubmit={hideModal}
			/>
		</header>
	)
}

export default memo(Header)
