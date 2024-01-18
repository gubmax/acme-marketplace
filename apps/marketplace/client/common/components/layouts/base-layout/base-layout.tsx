import Loader from '@acme/ui/components/loader/loader.js'
import type { ChildrenProp } from '@acme/ui/typings/children-prop.js'

import { useDesktopView } from 'client/common/hooks/use-desktop-view.js'
import { dynamic } from 'client/core/dynamic.js'

const BaseLayoutDesktopDynamic = dynamic(() => import('./desktop/base-layout-desktop.js'))
const BaseLayoutTouchDynamic = dynamic(() => import('./touch/base-layout-touch.js'))

const loaderTemplate = (
	<div className="flex w-full h-screen">
		<Loader className="m-a" />
	</div>
)

function BaseLayout({ children }: ChildrenProp) {
	const isDesktop = useDesktopView()
	const Component = isDesktop ? BaseLayoutDesktopDynamic : BaseLayoutTouchDynamic

	return <Component fallback={loaderTemplate}>{children}</Component>
}

export default BaseLayout
