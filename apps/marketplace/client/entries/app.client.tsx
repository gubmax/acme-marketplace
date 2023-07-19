import { hydrateRoot } from 'react-dom/client'

import App from 'client/common/components/app/app.js'
import { getJSONData } from 'client/common/helpers/get-json-data.js'
import { invariant } from 'client/common/helpers/invariant.js'
import { reportWebVitals } from 'client/common/utils/report-web-vitals.js'
import BrowserRouter from 'client/core/components/browser-router.js'
import type { RenderContextType } from 'client/core/entry-route-context.js'
import { document } from 'client/document.js'
import 'ui/styles/index.css'
import 'virtual:uno.css'

const renderContext = getJSONData<RenderContextType>('__RENDER_CONTEXT__')
invariant(renderContext)

hydrateRoot(
	window.document,
	document({
		renderContext,
		content: (
			<BrowserRouter>
				<App />
			</BrowserRouter>
		),
	}),
)

if (import.meta.env.PROD) {
	reportWebVitals(console.log)
}
