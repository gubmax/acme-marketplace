import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

import App from 'client/common/components/app/app.js'
import { getJSONData } from 'client/common/helpers/get-json-data.js'
import { setPageTitle } from 'client/common/stores/page-store.js'
import { reportWebVitals } from 'client/common/utils/report-web-vitals.js'
import BrowserRouter from 'client/core/components/browser-router.js'
import type { RenderContextType } from 'client/core/render-context.js'
import Document from 'client/document.js'
import 'ui/styles/index.css'
import 'virtual:uno.css'

const renderContext = getJSONData<RenderContextType>('__RENDER_CONTEXT__')

setPageTitle(renderContext?.payload.pageTitle)

hydrateRoot(
	window.document,
	<StrictMode>
		<Document renderContext={renderContext}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Document>
	</StrictMode>,
)

if (import.meta.env.PROD) {
	reportWebVitals(console.log)
}
