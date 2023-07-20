import type AssetCollectorService from '../asset-collector/asset-collector.service.js'
import type ConfigService from '../config/config.service.js'
import type { RenderService } from './render.service.production.js'

export default async (
	configService: ConfigService,
	assetCollectorService: AssetCollectorService,
): Promise<RenderService> => {
	return new (
		configService.env.isDev && !configService.env.isPrerendering
			? (await import('./render.service.development.js')).DevelopmentRenderService
			: (await import('./render.service.production.js')).RenderService
	)(configService, assetCollectorService)
}
