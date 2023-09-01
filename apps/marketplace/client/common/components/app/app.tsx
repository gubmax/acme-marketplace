import { useStore } from 'client/common/hooks/use-store.js'
import { routeStore } from 'client/core/models/router-model.js'
import ProgressBar from './progress-bar/progress-bar.js'

function App() {
	const route = useStore(routeStore)

	return (
		<>
			<ProgressBar />
			{route.element}
		</>
	)
}

export default App
