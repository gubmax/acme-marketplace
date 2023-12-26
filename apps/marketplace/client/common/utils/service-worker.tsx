import { memo, useRef, useState } from 'react'
import Button from '@acme/ui/components/buttons/button/button.js'
import Modal from '@acme/ui/components/floating/modal/modal.js'
import { toast } from '@acme/ui/components/toast/toast.js'
import { useRegisterSW } from 'virtual:pwa-register/react'

const ID_RELOAD_PROMT = 'sw-reload-promt'

function ServiceWorker() {
	const showPromtRef = useRef(false)
	const [showSplashScreen, setShowSplashScreen] = useState(false)

	const sw = useRegisterSW({
		onRegisteredSW(_, registration) {
			const ms = import.meta.env.VITE_SW_UPDATE_INTERVAL
			if (!ms) return

			setInterval(() => {
				showPromtRef.current = true
				void registration?.update()
			}, ms)
		},
		onNeedRefresh() {
			if (!showPromtRef.current) {
				setShowSplashScreen(true)
				void sw.updateServiceWorker()
				return
			}

			const reload = () => {
				toast.remove(ID_RELOAD_PROMT)
				setShowSplashScreen(true)
				void sw.updateServiceWorker()
			}

			toast({
				id: ID_RELOAD_PROMT,
				duration: Infinity,
				className: 'gap-2',
				content: (
					<>
						New content available, click on reload button to update!
						<Button onClick={reload}>Reload</Button>
					</>
				),
			})
		},
		onOfflineReady() {
			setShowSplashScreen(false)
		},
	})

	return (
		<Modal
			className="flex w-full h-full flex-col items-center justify-center"
			open={showSplashScreen}
		>
			<img className="w-1/4 max-w-40 mb-5" src="/favicon.svg" alt="logo" />
			<span className="text-title-lg">Loading...</span>
		</Modal>
	)
}

export default memo(ServiceWorker)
