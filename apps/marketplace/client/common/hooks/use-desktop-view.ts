import { useMediaQuery } from '@acme/ui/hooks/use-media-query.js'

import { useRenderer } from 'client/core/render-context.js'

export function useDesktopView(): boolean {
	const { deviceType } = useRenderer()
	return useMediaQuery('screen and (min-width: 480px)', deviceType === 'desktop')
}
