import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react'

import { cn } from '../../helpers/class-names.js'

// Dialog

export type DialogProps = HTMLAttributes<HTMLDivElement>

function Dialog(props: DialogProps, ref: ForwardedRef<HTMLDivElement>) {
	const { className, children, ...rest } = props

	return (
		<div ref={ref} className={cn('ui-dialog', className)} {...rest}>
			{children}
		</div>
	)
}

// DialogBody

export type DialogBodyProps = HTMLAttributes<HTMLDivElement>

function DialogBody(props: DialogBodyProps, ref: ForwardedRef<HTMLDivElement>) {
	const { className, children, ...rest } = props

	return (
		<div
			ref={ref}
			className={cn('ui-dialog__body bg-container rounded-t-lg px-6 py-5', className)}
			{...rest}
		>
			{children}
		</div>
	)
}

// DialogFooter

export type DialogFooterProps = HTMLAttributes<HTMLDivElement>

function DialogFooter(props: DialogBodyProps, ref: ForwardedRef<HTMLDivElement>) {
	const { className, children, ...rest } = props

	return (
		<div
			ref={ref}
			className={cn('ui-dialog__footer bg-outline rounded-b-lg px-6 py-3', className)}
			{...rest}
		>
			{children}
		</div>
	)
}

export default Object.assign(forwardRef(Dialog), {
	Body: forwardRef(DialogBody),
	Footer: forwardRef(DialogFooter),
})
