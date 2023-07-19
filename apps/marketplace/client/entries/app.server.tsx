import type { ReactNode } from 'react'
import { StaticRouter } from 'react-router-dom/server.js'

import App from 'client/common/components/app/app.js'
import type { RenderContextType } from 'client/core/entry-route-context.js'
import { document } from 'client/document.js'
import 'ui/styles/index.css'
import 'virtual:uno.css'

export interface AppRenderOptions {
	url: string
	renderContext: RenderContextType
}

export function render({ url, renderContext }: AppRenderOptions): ReactNode {
	return document({
		renderContext,
		content: (
			<StaticRouter location={url}>
				<App />
			</StaticRouter>
		),
	})
}
