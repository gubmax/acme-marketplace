import {
	createContext,
	type LinkHTMLAttributes,
	type ScriptHTMLAttributes,
	useContext,
} from 'react'
import type { ChildrenProp } from '@acme/ui/typings/children-prop.js'

import { invariant } from 'client/common/helpers/invariant.js'
import type { HtmlMetaDescriptor, LoaderDescriptor } from './page.js'

export interface RenderContextType {
	links?: Array<LinkHTMLAttributes<HTMLLinkElement>>
	styles?: Array<LinkHTMLAttributes<HTMLStyleElement>>
	loader?: LoaderDescriptor
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
