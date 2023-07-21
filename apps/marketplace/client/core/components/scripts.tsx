import { useEffect } from 'react'

import { useRenderContext } from 'client/core/render-context.js'

let isHydrated = false

function Scripts() {
	const { scripts } = useRenderContext()

	useEffect(() => {
		isHydrated = true
	}, [])

	return isHydrated ? null : (
		<>
			{scripts.map(({ content, ...rest }, index) => {
				return rest.type === 'application/json' ? (
					<script
						key={index}
						{...rest}
						suppressHydrationWarning
						dangerouslySetInnerHTML={{ __html: content }}
					/>
				) : (
					<script key={index} {...rest} />
				)
			})}
		</>
	)
}

export default Scripts
