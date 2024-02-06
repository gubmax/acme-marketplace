import { memo, useCallback, useMemo } from 'react'
import Button from '@acme/ui/components/buttons/button/button.js'
import Modal from '@acme/ui/components/floating/modal/modal.js'
import { produce } from 'immer'

import { useStore } from 'client/common/hooks/use-store.js'
import { routerModel } from 'client/core/router.js'
import AuthDialog from './auth-dialog.js'

const MODAL_PARAM = 'modal'
const MODAL_VALUE = 'login'

function AuthButton() {
	const route = useStore(routerModel.routeStore)

	const modalHref = useMemo(() => {
		const searchParams = new URLSearchParams(route.params)
		searchParams.set(MODAL_PARAM, MODAL_VALUE)
		return route.pathname + '?' + searchParams.toString()
	}, [route])

	const hideModal = useCallback(() => {
		const nextParams = produce(route.params, (draft) => {
			delete draft.modal
		})
		routerModel.navigate(route.pathname, nextParams)
	}, [route])

	return (
		<>
			<Button className="ml-auto" as="a" href={modalHref}>
				Sign In
			</Button>
			<Modal open={route.params[MODAL_PARAM] === MODAL_VALUE} onOpenChange={hideModal}>
				<AuthDialog />
			</Modal>
		</>
	)
}

export default memo(AuthButton)
