import type { ReactNode } from 'react'
import { StaticRouter } from 'react-router-dom/server.js'

import App from 'client/common/components/app/app.js'
import { setPageTitle } from 'client/common/stores/page-store.js'
import type { RenderContextType } from 'client/core/render-context.js'
import Document from 'client/document.js'
import 'ui/styles/index.css'
import 'virtual:uno.css'

export interface AppRenderOptions {
	url: string
	renderContext: RenderContextType
}

export function handleRequest({ url, renderContext }: AppRenderOptions): ReactNode {
	setPageTitle(renderContext?.payload.pageTitle ?? '')

	return (
		<Document renderContext={renderContext}>
			<StaticRouter location={url}>
				<App />
			</StaticRouter>
		</Document>
	)
}
