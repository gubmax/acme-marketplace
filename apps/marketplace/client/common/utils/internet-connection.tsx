import DoneIcon from '@acme/ui/components/icons/done-icon.js'
import Loader from '@acme/ui/components/loader/loader.js'
import { toast } from '@acme/ui/components/toast/toast.js'

const ID_OFFLINE_TOAST = 'internet-connection-offline'

function showConnectionLostToast() {
	toast({
		id: ID_OFFLINE_TOAST,
		duration: Infinity,
		className: 'gap-3',
		content: (
			<>
				<Loader />
				Internet connection lost
			</>
		),
	})
}

// Listeners

window.addEventListener('load', () => {
	if (!window.navigator.onLine) showConnectionLostToast()
})

window.addEventListener('offline', showConnectionLostToast)

window.addEventListener('online', () => {
	toast.remove(ID_OFFLINE_TOAST)
	toast({
		className: 'gap-2',
		content: (
			<>
				<DoneIcon />
				Connected to the internet
			</>
		),
	})
})
