import type { ReactNode } from 'react'

import App from 'client/common/components/app/app.js'
import type { RenderContextType } from 'client/core/render-context.js'
import Document from 'client/document.js'
import { initRouter } from './core/router.js'
import 'ui/styles/index.css'
import 'virtual:uno.css'

interface HandleRequestOptions {
	url: string
	renderContext: RenderContextType
}

export function handleRequest({ url, renderContext }: HandleRequestOptions): ReactNode {
	const { meta, payload } = renderContext
	initRouter({ meta, payload, href: url })

	return (
		<Document renderContext={renderContext}>
			<App />
		</Document>
	)
}
