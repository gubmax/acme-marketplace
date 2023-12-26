import { ToastContainer } from '@acme/ui/components/toast/toast.js'

import { useStore } from 'client/common/hooks/use-store.js'
import { routeStore } from 'client/core/models/router-model.js'
import BaseLayout from '../layouts/base/base-layout.js'
import ProgressBar from './progress-bar/progress-bar.js'

function App() {
	const { Component } = useStore(routeStore)

	return (
		<>
			<ProgressBar />
			<BaseLayout>
				<Component />
			</BaseLayout>
			<ToastContainer />
		</>
	)
}

export default App
