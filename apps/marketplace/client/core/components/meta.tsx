import { useStore } from 'client/common/hooks/use-store.js'
import { routerModel } from '../router.js'

function Meta() {
	const route = useStore(routerModel.routeStore)

	return (
		<>
			{Object.entries(route.meta).map(([name, value], index) => {
				if (name === 'title') return <title key={index}>{String(value)}</title>
				return <meta key={index} name={name} content={value} />
			})}
		</>
	)
}

export default Meta
