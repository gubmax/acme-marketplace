export type HtmlMetaDescriptor =
	| { charSet: 'utf-8' }
	| { title: string }
	| { name: string; content: string }
	| { property: string; content: string }
	| { httpEquiv: string; content: string }
	| Record<string, string>

export type MetaFunction = () => HtmlMetaDescriptor

export interface PayloadDescriptor {
	pageTitle?: string
}

export type PayloadFunction = () => PayloadDescriptor
