import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

import App from 'client/common/components/app/app.js'
import { reportWebVitals } from 'client/common/utils/report-web-vitals.js'
import { getRelativeRouteURL } from 'client/core/path.js'
import Document from 'client/document.js'
import { initRouter } from './core/router.js'
import 'ui/styles/index.css'
import 'virtual:uno.css'

import 'client/common/utils/error-handler.js'
import 'client/common/utils/internet-connection.js'

const renderContext = window.__RENDER_CONTEXT__
const { meta, payload } = renderContext

initRouter({
	meta,
	payload,
	href: getRelativeRouteURL(location),
	onChange: () => {
		window.scrollTo(0, 0)
	},
})

hydrateRoot(
	window.document,
	<StrictMode>
		<Document renderContext={renderContext}>
			<App />
		</Document>
	</StrictMode>,
)

if (import.meta.env.PROD) {
	reportWebVitals(console.log)
}
