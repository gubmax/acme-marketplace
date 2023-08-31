import { type ForwardedRef, forwardRef, type InputHTMLAttributes, memo } from 'react'

import { cn } from '../../../helpers/class-names.js'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'children'>

function Input(props: InputProps, ref: ForwardedRef<HTMLInputElement>) {
	const { className, ...rest } = props

	return (
		<input
			ref={ref}
			className={cn(
				'ui-input border-1 border-solid border-outline rounded-md bg-surface h-10',
				className,
			)}
			{...rest}
		></input>
	)
}

export default memo(forwardRef(Input))
