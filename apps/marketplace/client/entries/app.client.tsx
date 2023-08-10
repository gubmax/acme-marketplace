import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

import App from 'client/common/components/app/app.js'
import { getJSONData } from 'client/common/helpers/get-json-data.js'
import { reportWebVitals } from 'client/common/utils/report-web-vitals.js'
import type { RenderContextType } from 'client/core/render-context.js'
import Document from 'client/document.js'
import 'ui/styles/index.css'
import 'virtual:uno.css'

const renderContext = getJSONData<RenderContextType>('__RENDER_CONTEXT__')

hydrateRoot(
	window.document,
	<StrictMode>
		<Document renderContext={renderContext}>
			<App url={window.location.pathname} />
		</Document>
	</StrictMode>,
)

if (import.meta.env.PROD) {
	reportWebVitals(console.log)
}
