import { useRenderContext } from 'client/core/entry-route-context.js'

function Links() {
	const { links } = useRenderContext()

	return (
		<>
			{links.map((props, index) => (
				<link key={index} {...props} />
			))}
		</>
	)
}

export default Links
