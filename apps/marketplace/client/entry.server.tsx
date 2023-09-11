import type { ReactNode } from 'react'

import App from 'client/common/components/app/app.js'
import type { RenderContextType } from 'client/core/render-context.js'
import Document from 'client/document.js'
import { setInitialPage } from './core/models/router-model.js'
import 'ui/styles/index.css'
import 'virtual:uno.css'

export { modules, notFoundModule } from './core/routes.js'

interface HandleRequestOptions {
	url: string
	renderContext: RenderContextType
}

export function handleRequest({ url, renderContext }: HandleRequestOptions): ReactNode {
	const { loader, meta } = renderContext
	setInitialPage({ loader, meta, href: url })

	return (
		<Document renderContext={renderContext}>
			<App />
		</Document>
	)
}
