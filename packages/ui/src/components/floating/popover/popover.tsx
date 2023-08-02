import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react'
import { type FloatingContext, FloatingFocusManager, FloatingPortal } from '@floating-ui/react'

import { cn } from '../../../helpers/class-names.js'
import './popover.css'

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
	labelId?: string
	context: FloatingContext
}

function Popover(props: PopoverProps, ref: ForwardedRef<HTMLDivElement>) {
	const { className, labelId, context, children, ...rest } = props
	const { open, strategy, x, y } = context

	return (
		<FloatingPortal>
			{open && (
				<FloatingFocusManager context={context} modal={false}>
					<div
						ref={ref}
						className={cn('ui-popover rounded-md', className)}
						style={{ position: strategy, top: y, left: x }}
						aria-labelledby={labelId}
						{...rest}
					>
						{children}
					</div>
				</FloatingFocusManager>
			)}
		</FloatingPortal>
	)
}

const arrowClassName = {
	left: '-left-[12px] border-l-transparent border-r-background-tertiary',
	right: '-right-[12px] border-r-transparent border-l-background-tertiary',
}

interface ArrowProps {
	position: 'left' | 'right'
}

function Arrow({ position }: ArrowProps, ref: ForwardedRef<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'absolute top-1/2 -translate-y-1/2 border-[6px] border-y-transparent',
				arrowClassName[position],
			)}
			ref={ref}
		></div>
	)
}

export default Object.assign(forwardRef(Popover), { Arrow: forwardRef(Arrow) })
