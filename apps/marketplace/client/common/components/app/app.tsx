import { useCallback } from 'react'

import { setPageTitle } from 'client/common/stores/page-store.js'
import { useRenderer } from 'client/core/render-context.js'
import { type RouterOptions, useRouter } from 'client/core/router.js'
import ProgressBar from './progress-bar/progress-bar.js'

interface AppProps {
	url: string
}

function App({ url }: AppProps) {
	const renderContext = useRenderer()
	if (import.meta.env.SSR) setPageTitle(renderContext.payload?.pageTitle)

	const onChange: Required<RouterOptions>['onChange'] = useCallback((context) => {
		setPageTitle(context.payload?.pageTitle)
		window.scrollTo(0, 0)
	}, [])

	const route = useRouter({ url, onChange })

	return (
		<>
			<ProgressBar />
			{route}
		</>
	)
}

export default App
