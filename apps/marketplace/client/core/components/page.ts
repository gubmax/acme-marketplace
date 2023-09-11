export type HtmlMetaDescriptor =
	| { charSet: 'utf-8' }
	| { title: string }
	| { name: string; content: string }
	| { property: string; content: string }
	| { httpEquiv: string; content: string }
	| Record<string, string>

export type MetaFunction = () => HtmlMetaDescriptor

export type LoaderDescriptor<Params = unknown> = Params & {
	pageTitle?: string
	contentClassName?: string
}

export type LoaderFunction<Params = unknown> = () => LoaderDescriptor<Params>
