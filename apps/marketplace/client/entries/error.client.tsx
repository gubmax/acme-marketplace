import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

import { getJSONData } from 'client/common/helpers/get-json-data.js'
import type { RenderContextType } from 'client/core/render-context.js'
import Document from 'client/document.js'
import 'ui/styles/index.css'
import 'virtual:uno.css'

const renderContext = getJSONData<RenderContextType>('__RENDER_CONTEXT__')

hydrateRoot(
	window.document,
	<StrictMode>
		<Document renderContext={renderContext}>
			<p>Error</p>
		</Document>
	</StrictMode>,
)
