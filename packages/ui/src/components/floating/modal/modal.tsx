import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react'
import {
	type FloatingContext,
	FloatingFocusManager,
	FloatingOverlay,
	FloatingPortal,
} from '@floating-ui/react'

import { cn } from '../../../helpers/class-names.js'
import './modal.css'

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
	labelId?: string
	context: FloatingContext
}

function Modal(props: ModalProps, ref: ForwardedRef<HTMLDivElement>) {
	const { className, labelId, context, children, ...rest } = props

	return (
		<FloatingPortal>
			{context.open && (
				<FloatingOverlay className="ui-modal-overlay" lockScroll>
					<FloatingFocusManager context={context} modal>
						<div
							ref={ref}
							className={cn('ui-modal', className)}
							aria-labelledby={labelId}
							{...rest}
						>
							{children}
						</div>
					</FloatingFocusManager>
				</FloatingOverlay>
			)}
		</FloatingPortal>
	)
}

export default forwardRef(Modal)
