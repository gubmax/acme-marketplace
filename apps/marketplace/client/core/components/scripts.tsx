import { useEffect } from 'react'

import { useRenderer } from 'client/core/render-context.js'

let isHydrated = false

function Scripts() {
	const { scripts } = useRenderer()

	useEffect(() => {
		isHydrated = true
	}, [])

	return isHydrated ? null : (
		<>
			{scripts?.map(({ content, ...rest }, index) => {
				return content ? (
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
