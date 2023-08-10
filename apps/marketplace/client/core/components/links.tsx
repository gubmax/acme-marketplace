import { useRenderer } from 'client/core/render-context.js'

function Links() {
	const { links } = useRenderer()

	return <>{links?.map((props, index) => <link key={index} {...props} />)}</>
}

export default Links
