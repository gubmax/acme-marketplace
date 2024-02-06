import type { ChildrenProp } from '@acme/ui/typings/children-prop.js'

import AppLoader from 'client/common/components/app-loader/app-loader.js'
import { useDesktopView } from 'client/common/hooks/use-desktop-view.js'
import { dynamic } from 'client/core/dynamic.js'

const BaseLayoutDesktopDynamic = dynamic(() => import('./desktop/base-layout-desktop.js'))
const BaseLayoutTouchDynamic = dynamic(() => import('./touch/base-layout-touch.js'))

function BaseLayout({ children }: ChildrenProp) {
	const isDesktop = useDesktopView()
	const Component = isDesktop ? BaseLayoutDesktopDynamic : BaseLayoutTouchDynamic

	return <Component fallback={<AppLoader />}>{children}</Component>
}

export default BaseLayout
