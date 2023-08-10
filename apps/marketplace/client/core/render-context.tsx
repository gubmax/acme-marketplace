import {
	createContext,
	type LinkHTMLAttributes,
	type ScriptHTMLAttributes,
	useContext,
} from 'react'
import type { ChildrenProp } from 'ui/typings/children-prop.js'

import { invariant } from 'client/common/helpers/invariant.js'
import type { HtmlMetaDescriptor } from './components/page.js'

export interface RenderContextType {
	payload: { pageTitle: string }
	links?: Array<LinkHTMLAttributes<HTMLLinkElement>>
	styles?: Array<LinkHTMLAttributes<HTMLStyleElement>>
	meta?: HtmlMetaDescriptor
	scripts?: Array<ScriptHTMLAttributes<HTMLScriptElement> & { content: string }>
}

const RenderContext = createContext<RenderContextType | null>(null)

export function useRenderer(): RenderContextType {
	const context = useContext(RenderContext)
	invariant(context)

	return context
}

export function RenderProvider({ value, children }: { value?: RenderContextType } & ChildrenProp) {
	return <RenderContext.Provider value={value ?? null}>{children}</RenderContext.Provider>
}
