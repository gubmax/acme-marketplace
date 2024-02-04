import { Children } from 'react'

import type { GroupSliderProps } from '../group-slider.js'
import './group-slider-touch.css'

function GroupSliderTouch({ className, style, headerSlot, children }: GroupSliderProps) {
	const childrenArr = Children.toArray(children)

	return (
		<div className={className} style={style}>
			{headerSlot}
			<div className="m-group-slider-touch__wrapper no-scrollbar mt-3">
				{childrenArr.map((child, i) => (
					<div key={i} className="m-group-slider-touch__item">
						{child}
					</div>
				))}
			</div>
		</div>
	)
}

export default GroupSliderTouch
