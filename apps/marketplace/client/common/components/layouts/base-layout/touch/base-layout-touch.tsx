import { memo } from 'react'
import type { ChildrenProp } from '@acme/ui/typings/children-prop.js'

import './base-layout-touch.css'

function BaseLayoutTouch({ children }: ChildrenProp) {
	return <main className="m-base-layout-touch p-5">{children}</main>
}

export default memo(BaseLayoutTouch)
