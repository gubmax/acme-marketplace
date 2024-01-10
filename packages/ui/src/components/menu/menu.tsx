import {
	type ComponentPropsWithoutRef,
	type ElementType,
	type ForwardedRef,
	forwardRef,
} from 'react'

import { cn } from '../../helpers/class-names.js'
import './menu.css'

// Menu

export type MenuElement = 'div' | 'nav' | 'ul'
export type MenuProps<T extends MenuElement> = ComponentPropsWithoutRef<T> & {
	as?: T
}

function Menu<T extends MenuElement>(
	props: MenuProps<T>,
	ref: ForwardedRef<HTMLElementTagNameMap[T]>,
) {
	const { as, className, children, ...rest } = props
	const Element = (as ?? 'ul') as ElementType

	return (
		<Element ref={ref} className={cn('ui-menu rounded-md bg-outline p-2', className)} {...rest}>
			{children}
		</Element>
	)
}

// MenuItem

export type MenuItemElement = 'li' | 'a' | 'button'
export type MenuItemProps<T extends MenuItemElement> = ComponentPropsWithoutRef<T> & {
	as?: T
	active?: boolean
}

function MenuItem<T extends MenuItemElement = 'li'>(
	props: MenuItemProps<T>,
	ref: ForwardedRef<HTMLElementTagNameMap[T]>,
) {
	const { as, active, className, children, ...rest } = props
	const Element = (as ?? 'li') as ElementType

	return (
		<Element
			ref={ref}
			className={cn(
				'ui-menu__item flex items-center p-2 rounded-md transition-colors',
				active && 'ui-active',
				className,
			)}
			{...rest}
		>
			{children}
		</Element>
	)
}

export default Object.assign(forwardRef(Menu), {
	Item: forwardRef(MenuItem),
})
