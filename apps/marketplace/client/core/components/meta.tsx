import { useState } from 'react'

import { useEffectOnce } from 'client/common/hooks/use-effect-once.js'
import { preloadRouteModel } from 'client/core/models/preload-route.model.js'
import { useRenderContext } from 'client/core/render-context.js'
import type { HtmlMetaDescriptor } from './modules.js'

function Meta() {
	const { meta: renderMeta } = useRenderContext()
	const [meta, setMeta] = useState<HtmlMetaDescriptor>(renderMeta)

	useEffectOnce(() => {
		const subscription = preloadRouteModel.preloadObs.subscribe(({ meta }) => setMeta(meta))
		return () => subscription.unsubscribe()
	})

	return (
		<>
			{Object.entries(meta).map(([name, value], index) => {
				if (name === 'title') return <title key={index}>{String(value)}</title>
				return <meta key={index} name={name} content={value} />
			})}
		</>
	)
}

export default Meta
