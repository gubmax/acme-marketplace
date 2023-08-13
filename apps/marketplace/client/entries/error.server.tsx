import type { ReactNode } from 'react'

import type { RenderContextType } from 'client/core/render-context.js'
import Document from 'client/document.js'
import 'ui/styles/index.css'
import 'virtual:uno.css'

interface HandleRequestOptions {
	renderContext: RenderContextType
}

export function handleRequest({ renderContext }: HandleRequestOptions): ReactNode {
	return (
		<Document renderContext={renderContext}>
			<p>Error</p>
		</Document>
	)
}
