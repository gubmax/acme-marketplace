import type { ReactNode } from 'react'

import type { RenderContextType } from 'client/core/render-context.js'
import Document from 'client/document.js'
import 'ui/styles/index.css'
import 'virtual:uno.css'

export interface ErrorRenderOptions {
	renderContext: RenderContextType
}

export function handleRequest({ renderContext }: ErrorRenderOptions): ReactNode {
	return (
		<Document renderContext={renderContext}>
			<p>Error</p>
		</Document>
	)
}
