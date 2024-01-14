import { useRenderer } from 'client/core/render-context.js'
import { useMediaQuery } from './use-media-query.js'

export function useDesktopView(): boolean {
	const { deviceType } = useRenderer()
	return useMediaQuery('screen and (min-width: 480px)', deviceType === 'desktop')
}
