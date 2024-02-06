import { ToastContainer } from '@acme/ui/components/toast/toast.js'

import { useStore } from 'client/common/hooks/use-store.js'
import { routerModel } from 'client/core/router.js'
import BaseLayout from '../layouts/base-layout/base-layout.js'
import ProgressBar from './progress-bar/progress-bar.js'

function App() {
	const { Component } = useStore(routerModel.routeStore)

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
