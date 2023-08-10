import type { RenderContext } from '../render-page.js'

/**
 * TODO: Add meta and payload collecting
 */
export function collectRouteContext(
	entryContext: RenderContext,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	moduleId: string,
): void {
	Object.assign(entryContext.meta, {})
}
