import {
	type ComponentPropsWithoutRef,
	type ElementType,
	type ForwardedRef,
	forwardRef,
} from 'react'

import { cn } from '../../../helpers/class-names.js'
import Loader, { type LoaderSize } from '../../loader/loader.js'
import './button-base.css'

export type ButtonBaseElement = 'button' | 'a'

export type ButtonBaseProps<T extends ButtonBaseElement> = ComponentPropsWithoutRef<T> & {
	as?: T
	loaderSize?: LoaderSize
	loading?: boolean
	disabled?: boolean
}

function ButtonBase<T extends ButtonBaseElement = 'button'>(
	props: ButtonBaseProps<T>,
	ref: ForwardedRef<HTMLElementTagNameMap[T]>,
) {
	const { as, className, loading = false, disabled = false, loaderSize, children, ...rest } = props
	const Element = (as ?? 'button') as ElementType

	return (
		<Element
			ref={ref}
			className={cn('ui-button-base', loading && 'ui-loading', className)}
			disabled={loading || disabled}
			{...rest}
		>
			{loading ? <Loader size={loaderSize} /> : children}
		</Element>
	)
}

export default forwardRef(ButtonBase)
