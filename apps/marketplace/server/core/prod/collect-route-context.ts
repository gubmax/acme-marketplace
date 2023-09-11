import type { RenderContext } from '../render-context.js'
import { type EntryModule } from './renderer.js'

export async function collectRouteContext(
	entryContext: RenderContext,
	entryModule: EntryModule,
	moduleId: string,
): Promise<void> {
	const module = await (entryModule.modules['/' + moduleId] ?? entryModule.notFoundModule)()

	const loader = (module.loader as (() => RenderContext['loader']) | undefined)?.()
	if (loader) Object.assign(entryContext.loader, loader)

	const meta = (module.meta as (() => RenderContext['meta']) | undefined)?.()
	if (meta) Object.assign(entryContext.meta, meta)
}
