import type { ReactNode } from 'react'
import type { ChildrenProp } from '@acme/ui/typings/children-prop.js'
import type { StyledProps } from '@acme/ui/typings/styled-props.js'

import { useDesktopView } from 'client/common/hooks/use-desktop-view.js'
import GroupSliderDesktop from './desktop/group-slider-desktop.js'
import GroupSliderTouch from './touch/group-slider-touch.js'

export interface GroupSliderProps extends ChildrenProp, StyledProps {
	headerSlot: ReactNode
}

function GroupSlider({ children, ...rest }: GroupSliderProps) {
	const isDesktop = useDesktopView()
	const Component = isDesktop ? GroupSliderDesktop : GroupSliderTouch
	return <Component {...rest}>{children}</Component>
}

export default GroupSlider
