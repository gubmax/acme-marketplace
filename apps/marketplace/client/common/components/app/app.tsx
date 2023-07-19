import { useRoutes } from 'react-router-dom'

import { useLinkHandler } from 'client/core/use-link-handler.js'
import { routes } from 'client/routes.js'
import ProgressBar from './progress-bar/progress-bar.js'

function App() {
	const route = useRoutes(routes)

	useLinkHandler()

	return (
		<>
			<ProgressBar />
			{route}
		</>
	)
}

export default App
