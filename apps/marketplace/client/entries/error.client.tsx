import { hydrateRoot } from 'react-dom/client'

import { getJSONData } from 'client/common/helpers/get-json-data.js'
import { invariant } from 'client/common/helpers/invariant.js'
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
		content: <p>Error</p>,
	}),
)
