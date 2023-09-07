export interface RenderContext {
	payload: { pageTitle?: string }
	links: Array<Record<string, unknown>>
	styles: Array<Record<string, unknown>>
	meta: Record<string, string>
	scripts: Array<Record<string, unknown>>
}

export function getClientRenderContext(renderContext: RenderContext): string {
	const { meta, payload } = renderContext
	const context = JSON.stringify({ meta, payload })

	return `window.__RENDER_CONTEXT__ = ${context}`
}
