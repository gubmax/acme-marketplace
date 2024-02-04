import { Children, useRef } from 'react'
import Button from '@acme/ui/components/buttons/button/button.js'
import ChevronRightIcon from '@acme/ui/components/icons/chevron-right-icon.js'
import { useSlideTransition } from '@acme/ui/hooks/use-slide-transition/use-slide-transition.js'

import type { GroupSliderProps } from '../group-slider.js'
import './group-slider-desktop.css'

function GroupSlider({ className, style, headerSlot, children }: GroupSliderProps) {
	const wrapperRef = useRef<HTMLDivElement>(null)
	const innerRef = useRef<HTMLDivElement>(null)

	const [reverseTransition, nextTransition] = useSlideTransition(wrapperRef, innerRef)

	return (
		<div className={className} style={style}>
			<div className="m-group-slider-desktop__header mb-3">
				{headerSlot}
				<div className="m-group-slider-desktop__buttons-group">
					<Button className="mr-2" variant="tonal" onClick={reverseTransition}>
						<ChevronRightIcon className="rotate-180" />
					</Button>
					<Button variant="tonal" onClick={nextTransition}>
						<ChevronRightIcon />
					</Button>
				</div>
			</div>
			<div className="m-group-slider-desktop__wrapper no-scrollbar -ml-5" ref={wrapperRef}>
				<div className="flex" ref={innerRef}>
					{Children.toArray(children).map((child, index) => (
						<div key={index} className="m-group-slider-desktop__item pl-5">
							{child}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default GroupSlider
