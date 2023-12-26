import type { ChildrenProp } from '@acme/ui/typings/children-prop.js'

import Links from './core/components/links.js'
import Meta from './core/components/meta.js'
import Scripts from './core/components/scripts.js'
import Styles from './core/components/styles.js'
import { type RenderContextType, RenderProvider } from './core/render-context.js'

interface DocumentProps extends ChildrenProp {
	renderContext?: RenderContextType
}

export default function Document({ renderContext, children }: DocumentProps) {
	return (
		<RenderProvider value={renderContext}>
			<html lang="en">
				<head>
					<meta charSet="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<meta name="color-scheme" content="dark light" />
					<meta name="theme-color" content="#f9f9f9" media="(prefers-color-scheme: light)" />
					<meta name="theme-color" content="#17181c" media="(prefers-color-scheme: dark)" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<Meta />
					<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
					<link rel="mask-icon" href="/favicon.svg" color="#646cff" />
					<Links />
					<Styles />
				</head>
				<body>
					{children}
					<Scripts />
				</body>
			</html>
		</RenderProvider>
	)
}
