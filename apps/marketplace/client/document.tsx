import type { ChildrenProp } from 'ui/typings/children-prop.js'

import Links from './core/components/links.js'
import LiveReload from './core/components/live-reload.js'
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
					<Meta />
					<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
					<Links />
					<Styles />
				</head>
				<body>
					{children}
					<LiveReload />
					<Scripts />
				</body>
			</html>
		</RenderProvider>
	)
}
