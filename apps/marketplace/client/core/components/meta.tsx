import { useSubscription } from 'client/common/hooks/use-subscription.js'
import { routerModel } from 'client/core/models/router-model.js'
import { useRenderer } from 'client/core/render-context.js'

function Meta() {
	const renderer = useRenderer()
	const route = useSubscription(routerModel.preloadRouteObs)

	return (
		<>
			{Object.entries(route?.meta ?? renderer.meta ?? {}).map(([name, value], index) => {
				if (name === 'title') return <title key={index}>{String(value)}</title>
				return <meta key={index} name={name} content={value} />
			})}
		</>
	)
}

export default Meta
