/// <reference types="@acme/ui/client" />
/// <reference types="vite-plugin-pwa/react" />
/// <reference types="../plugins/vite-plugin-routes-manifest/types.d.ts" />

import type { RenderContextType } from 'client/core/render-context.js'

declare global {
	interface ImportMetaEnv {
		readonly VITE_SW_UPDATE_INTERVAL: number
	}

	interface ImportMeta {
		readonly env: ImportMetaEnv
	}

	interface Window {
		__RENDER_CONTEXT__: RenderContextType
	}
}
