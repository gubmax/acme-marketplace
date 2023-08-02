import { type ForwardedRef, forwardRef } from 'react'

import { cn } from '../../../helpers/class-names.js'
import ButtonBase, {
	type ButtonBaseElement,
	type ButtonBaseProps,
} from '../button-base/button-base.js'
import './button.css'

export type ButtonVariant = 'filled' | 'tonal'
export type ButtonSize = 'md' | 'lg'

export type ButtonProps<T extends ButtonBaseElement = 'button'> = ButtonBaseProps<T> & {
	variant?: ButtonVariant
	size?: ButtonSize
}

function Button<T extends ButtonBaseElement = 'button'>(
	props: ButtonProps<T>,
	ref: ForwardedRef<HTMLElementTagNameMap[T]>,
) {
	const { className, variant = 'filled', size = 'md', children, ...rest } = props

	return (
		<ButtonBase
			ref={ref}
			className={cn(
				`ui-button ui-variant--${variant} ui-size--${size} text-label-lg px-6`,
				className,
			)}
			{...(rest as ButtonBaseProps<ButtonBaseElement>)}
		>
			{children}
		</ButtonBase>
	)
}

export default forwardRef(Button)
