import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react'

import { cn } from '../../helpers/class-names.js'

export type TextFieldProps = HTMLAttributes<HTMLDivElement>

function TextField(props: TextFieldProps, ref: ForwardedRef<HTMLDivElement>) {
	const { className, children, ...rest } = props

	return (
		<div ref={ref} className={cn('ui-text-field flex flex-col gap-2', className)} {...rest}>
			{children}
		</div>
	)
}

export default forwardRef(TextField)
