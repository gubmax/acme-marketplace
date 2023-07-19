import type { ReactNode } from 'react'

import type { RenderContextType } from 'client/core/entry-route-context.js'
import { document } from 'client/document.js'
import 'ui/styles/index.css'
import 'virtual:uno.css'

export interface ErrorRenderOptions {
	renderContext: RenderContextType
}

export function render({ renderContext }: ErrorRenderOptions): ReactNode {
	return document({
		renderContext,
		content: <p>Error</p>,
	})
}
