import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react'
import { FloatingFocusManager, FloatingOverlay, FloatingPortal } from '@floating-ui/react'

import { cn } from '../../../helpers/class-names.js'
import { mergeRefs } from '../../../helpers/merge-refs.js'
import { usePopover } from '../../../hooks/use-popover.js'
import './modal.css'

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
	open?: boolean
	onOpenChange?: (open: boolean) => void
	labelId?: string
}

function Modal(props: ModalProps, ref: ForwardedRef<HTMLDivElement>) {
	const { className, labelId, open = false, children, onOpenChange, ...rest } = props
	const { context, refs, getFloatingProps } = usePopover({ open, onOpenChange })

	return (
		<FloatingPortal>
			{context.open && (
				<FloatingOverlay className="ui-modal-overlay">
					<FloatingFocusManager context={context} modal>
						<div
							ref={mergeRefs(ref, refs.setFloating)}
							className={cn('ui-modal', className)}
							aria-labelledby={labelId}
							{...getFloatingProps()}
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
