import {
	createContext,
	type LinkHTMLAttributes,
	type ScriptHTMLAttributes,
	useContext,
} from 'react'

import { invariant } from 'client/common/helpers/invariant.js'
import type { ChildrenProp } from 'client/common/typings/children-prop.js'
import type { HtmlMetaDescriptor } from './components/modules'

export interface RenderContextType {
	links: Array<LinkHTMLAttributes<HTMLLinkElement>>
	styles: Array<LinkHTMLAttributes<HTMLStyleElement>>
	meta: HtmlMetaDescriptor
	scripts: Array<ScriptHTMLAttributes<HTMLScriptElement> & { content: string }>
}

const RenderContext = createContext<RenderContextType | null>(null)

export function useRenderContext(): RenderContextType {
	const context = useContext(RenderContext)
	invariant(context)

	return context
}

export function RenderProvider({ value, children }: { value?: RenderContextType } & ChildrenProp) {
	return <RenderContext.Provider value={value ?? null}>{children}</RenderContext.Provider>
}
