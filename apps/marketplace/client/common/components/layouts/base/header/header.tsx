import { memo, useCallback, useMemo } from 'react'
import { produce } from 'immer'
import Button from 'ui/components/buttons/button/button.js'
import Dialog from 'ui/components/dialog/dialog.js'
import Modal from 'ui/components/floating/modal/modal.js'

import { useStore } from 'client/common/hooks/use-store.js'
import { openPage, routeStore } from 'client/core/models/router-model.js'
import './header.css'

const MODAL_PARAM = 'modal'
const MODAL_VALUE = 'login'

function Header() {
	const route = useStore(routeStore)

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
			<h1 className="text-title-lg">{route.payload.pageTitle}</h1>
			<Button as="a" className="ml-auto" href={modalHref}>
				Sign In
			</Button>
			<Modal open={route.params[MODAL_PARAM] === MODAL_VALUE} onOpenChange={hideModal}>
				<Dialog>
					<form onSubmit={hideModal}>
						<Dialog.Body className="flex flex-col gap-5">
							<label>
								<label className="block mb-3">Login</label>
								<input type="text" name="login" defaultValue="admin" required />
							</label>
							<label>
								<span className="block mb-3">Password</span>
								<input type="password" name="password" defaultValue="admin" required />
							</label>
						</Dialog.Body>
						<Dialog.Footer className="flex justify-end gap-3">
							<Button variant="filled" size="lg" type="submit">
								Sign In
							</Button>
						</Dialog.Footer>
					</form>
				</Dialog>
			</Modal>
		</header>
	)
}

export default memo(Header)
