import {
	createContext,
	type ForwardedRef,
	forwardRef,
	type HTMLAttributes,
	useContext,
	useId,
} from 'react'

import { cn } from '../../../helpers/class-names.js'
import Input, { type InputProps } from '../input/input.js'

// TextField

const TextFieldContext = createContext<{ inputId: string; errorId: string }>({
	inputId: '',
	errorId: '',
})

export type TextFieldProps = HTMLAttributes<HTMLDivElement>

function TextField(props: TextFieldProps, ref: ForwardedRef<HTMLDivElement>) {
	const { className, children, ...rest } = props

	const inputId = useId()
	const errorId = useId()

	return (
		<div ref={ref} className={cn('ui-text-field flex flex-col gap-2', className)} {...rest}>
			<TextFieldContext.Provider value={{ inputId, errorId }}>{children}</TextFieldContext.Provider>
		</div>
	)
}

// Label

function TextFieldLabel(
	props: HTMLAttributes<HTMLLabelElement>,
	ref: ForwardedRef<HTMLLabelElement>,
) {
	const { className, children, ...rest } = props
	const { inputId } = useContext(TextFieldContext)

	return (
		<label className={cn('block text-label-lg', className)} ref={ref} htmlFor={inputId} {...rest}>
			{children}
		</label>
	)
}

// Input

function TextFieldInput(props: InputProps, ref: ForwardedRef<HTMLInputElement>) {
	const { className, ...rest } = props
	const { inputId, errorId } = useContext(TextFieldContext)

	return (
		<Input
			className={cn('w-full', className)}
			ref={ref}
			type="text"
			id={inputId}
			aria-describedby={errorId}
			{...rest}
		/>
	)
}

// Error

function TextFieldError(
	props: HTMLAttributes<HTMLSpanElement>,
	ref: ForwardedRef<HTMLSpanElement>,
) {
	const { className, children, ...rest } = props
	const { errorId } = useContext(TextFieldContext)

	if (children === undefined) return null

	return (
		<span
			className={cn('color-error', className)}
			ref={ref}
			id={errorId}
			role="alert"
			aria-live="assertive"
			{...rest}
		>
			{children}
		</span>
	)
}

export default Object.assign(forwardRef(TextField), {
	Label: forwardRef(TextFieldLabel),
	Input: forwardRef(TextFieldInput),
	Error: forwardRef(TextFieldError),
})
