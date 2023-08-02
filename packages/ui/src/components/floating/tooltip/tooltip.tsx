import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react'
import { type FloatingContext, FloatingPortal } from '@floating-ui/react'

import { cn } from '../../../helpers/class-names.js'
import './tooltip.css'

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
	arrowRef: ForwardedRef<HTMLDivElement>
	context: FloatingContext
}

const ARROW_SIDE_BY_PLACEMENT: Record<string, string | undefined> = {
	top: 'bottom',
	right: 'left',
	bottom: 'top',
	left: 'right',
}

function Tooltip(props: TooltipProps, ref: ForwardedRef<HTMLDivElement>) {
	const { className, context, children, arrowRef, ...rest } = props
	const { open, strategy, x, y, placement, middlewareData } = context
	const { arrow: { x: arrowX, y: arrowY } = {} } = middlewareData

	const staticSide: string = ARROW_SIDE_BY_PLACEMENT[placement.split('-')[0]] ?? ''

	return (
		<FloatingPortal>
			{open && (
				<div
					ref={ref}
					className={cn('ui-tooltip rounded-md', className)}
					style={{ position: strategy, top: y, left: x }}
					{...rest}
				>
					<div
						ref={arrowRef}
						className="ui-tooltip__arrow"
						style={{ top: arrowY ?? '', left: arrowX ?? '', [staticSide]: '-0.5rem' }}
					/>
					{children}
				</div>
			)}
		</FloatingPortal>
	)
}

export default forwardRef(Tooltip)
