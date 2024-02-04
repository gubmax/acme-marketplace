import { type MutableRefObject, useCallback } from 'react'

import { invariant } from '../../helpers/invariant.js'
import './use-slide-transition.css'

const TRANSITION_CLASSNAME = 'ui-use-slide-transition'

export function useSlideTransition(
	wrapperRef: MutableRefObject<HTMLDivElement | null>,
	innerRef: MutableRefObject<HTMLDivElement | null>,
) {
	const runTransition = useCallback(
		(reverse = false) => {
			const wrapperEl = wrapperRef.current
			const innerEl = innerRef.current

			invariant(wrapperEl !== null && innerEl !== null)

			if (innerEl.classList.contains(TRANSITION_CLASSNAME)) return

			const { offsetWidth } = wrapperEl
			let offset = reverse ? -offsetWidth : offsetWidth

			if (!reverse && wrapperEl.scrollWidth - wrapperEl.scrollLeft - offset - offsetWidth <= 0) {
				offset = wrapperEl.scrollWidth - wrapperEl.clientWidth - wrapperEl.scrollLeft
			} else if (reverse && wrapperEl.scrollLeft + offset <= 0) {
				offset = -wrapperEl.scrollLeft
			}

			if (offset === 0) return

			innerEl.classList.add(TRANSITION_CLASSNAME)
			innerEl.style.transform = `translate3d(${innerEl.scrollLeft - offset}px, 0, 0)`

			innerEl.addEventListener(
				'transitionend',
				() => {
					innerEl.classList.remove(TRANSITION_CLASSNAME)
					innerEl.style.transform = 'unset'
					wrapperEl.scrollLeft += offset
				},
				{ once: true },
			)
		},
		[innerRef, wrapperRef],
	)

	const reverseTransition = useCallback(() => {
		runTransition(true)
	}, [runTransition])

	const nextTransition = useCallback(() => {
		runTransition()
	}, [runTransition])

	return [reverseTransition, nextTransition]
}
