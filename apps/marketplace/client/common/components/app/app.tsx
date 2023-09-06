import { ToastContainer } from 'ui/components/toast/toast.js'

import { useStore } from 'client/common/hooks/use-store.js'
import ServiceWorker from 'client/common/utils/service-worker.js'
import { routeStore } from 'client/core/models/router-model.js'
import ProgressBar from './progress-bar/progress-bar.js'

function App() {
	const route = useStore(routeStore)

	return (
		<>
			<ProgressBar />
			{route.element}
			<ToastContainer />
			{!import.meta.env.SSR && <ServiceWorker />}
		</>
	)
}

export default App
