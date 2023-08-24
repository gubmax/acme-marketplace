export interface RenderContext {
	payload: { pageTitle?: string }
	links: Array<Record<string, unknown>>
	styles: Array<Record<string, unknown>>
	meta: Record<string, string>
	scripts: Array<Record<string, unknown>>
}

export function getRenderContextJSON(renderContext: RenderContext): Record<string, unknown> {
	return {
		id: '__RENDER_CONTEXT__',
		type: 'application/json',
		content: JSON.stringify({
			payload: renderContext.payload,
			meta: renderContext.meta,
		}),
	}
}
