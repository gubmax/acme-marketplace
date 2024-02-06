import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

import App from 'client/common/components/app/app.js'
import { reportWebVitals } from 'client/common/utils/report-web-vitals.js'
import ServiceWorker from 'client/common/utils/service-worker.js'
import { getRelativeRouteURL } from 'client/core/path.js'
import Document from 'client/document.js'
import { initBrowserRouter, routerModel } from './core/router.js'
import '@acme/ui/styles/index.css'
import 'virtual:uno.css'

import 'client/common/utils/error-handler.js'
import 'client/common/utils/internet-connection.js'

const renderContext = window.__RENDER_CONTEXT__

const { loader, meta } = renderContext
routerModel.setRoute({ loader, meta, href: getRelativeRouteURL(location) })

hydrateRoot(
	window.document,
	<StrictMode>
		<Document renderContext={renderContext}>
			<App />
			<ServiceWorker />
		</Document>
	</StrictMode>,
)

initBrowserRouter({
	onChange: () => {
		window.scrollTo(0, 0)
	},
})

if (import.meta.env.PROD) {
	reportWebVitals(console.log)
}
