import { useCallback } from 'react'

import { useStore } from 'client/common/hooks/use-store.js'
import { routeStore } from 'client/core/models/router-model.js'
import { type RouterOptions, useRouter } from 'client/core/router.js'
import ProgressBar from './progress-bar/progress-bar.js'

function App() {
	const onChange: Required<RouterOptions>['onChange'] = useCallback(() => {
		window.scrollTo(0, 0)
	}, [])
	useRouter({ onChange })

	const route = useStore(routeStore)

	return (
		<>
			<ProgressBar />
			{route.element}
		</>
	)
}

export default App
