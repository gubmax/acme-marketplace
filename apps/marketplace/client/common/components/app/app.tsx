import { useCallback } from 'react'

import { type RouterOptions, useRouter } from 'client/core/router.js'
import ProgressBar from './progress-bar/progress-bar.js'

function App() {
	const onChange: Required<RouterOptions>['onChange'] = useCallback(() => window.scrollTo(0, 0), [])
	const route = useRouter({ onChange })

	return (
		<>
			<ProgressBar />
			{route}
		</>
	)
}

export default App
