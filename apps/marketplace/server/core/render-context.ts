export interface RenderDescriptors {
	loader: Record<string, string>
	meta: Record<string, string>
}

export interface RenderContext extends RenderDescriptors {
	links: Array<Record<string, unknown>>
	scripts: Array<Record<string, unknown>>
	styles: Array<Record<string, unknown>>
}

export function getClientRenderContext(renderContext: RenderContext): string {
	const { loader, meta } = renderContext
	const context = JSON.stringify({ loader, meta })

	return `window.__RENDER_CONTEXT__ = ${context}`
}
