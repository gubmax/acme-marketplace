import type { RenderContext } from '../render.context.js'
import { type EntryModule } from './renderer.js'

async function getContextByModuleId(
	entryModule: EntryModule,
	id: string,
): Promise<{ meta?: RenderContext['meta']; payload?: { pageTitle?: string } }> {
	const module = await (entryModule.modules['/' + id] ?? entryModule.notFoundModule)()

	const meta = (module.meta as (() => RenderContext['meta']) | undefined)?.()
	const payload = (module.payload as (() => { pageTitle?: string }) | undefined)?.()

	return { meta, payload }
}

export async function collectRouteContext(
	entryContext: RenderContext,
	entryModule: EntryModule,
	moduleId: string,
): Promise<void> {
	const { meta, payload } = await getContextByModuleId(entryModule, moduleId)
	if (meta) Object.assign(entryContext.meta, meta)
	if (payload) Object.assign(entryContext.payload, payload)
}
