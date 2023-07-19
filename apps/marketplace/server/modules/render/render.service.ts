import type AssetCollectorService from '../asset-collector/asset-collector.service.js'
import type ConfigService from '../config/config.service.js'
import { DevelopmentRenderService } from './render.service.development.js'
import { RenderService } from './render.service.production.js'

export default (
	configService: ConfigService,
	assetCollectorService: AssetCollectorService,
): RenderService => {
	return configService.app.env.isDev && !configService.app.env.isPrerendering
		? new DevelopmentRenderService(assetCollectorService)
		: new RenderService(assetCollectorService)
}
