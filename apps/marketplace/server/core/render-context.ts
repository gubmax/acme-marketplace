export interface RenderDescriptors {
	loader: Record<string, string>
	meta: Record<string, string>
}

export interface RenderContext extends RenderDescriptors {
	deviceType: string
	links: Array<Record<string, unknown>>
	scripts: Array<Record<string, unknown>>
	styles: Array<Record<string, unknown>>
}

export function getClientRenderContext(renderContext: RenderContext): string {
	const { loader, meta, deviceType } = renderContext
	const context = JSON.stringify({ loader, meta, deviceType })

	return `window.__RENDER_CONTEXT__ = ${context}`
}
