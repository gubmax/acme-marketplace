import {
	type ComponentPropsWithoutRef,
	type ElementType,
	type ForwardedRef,
	forwardRef,
} from 'react'

import { cn } from '../../helpers/class-names.js'
import './navigation.css'

// Navigation

export type NavigationElement = 'ul' | 'nav' | 'div'
export type NavigationProps<T extends NavigationElement> = ComponentPropsWithoutRef<T> & {
	as?: T
}

function Navigation<T extends NavigationElement = 'ul'>(
	props: NavigationProps<T>,
	ref: ForwardedRef<HTMLElementTagNameMap[T]>,
) {
	const { as, className, children, ...rest } = props
	const Component = (as ?? 'ul') as ElementType

	return (
		<Component ref={ref} className={cn('ui-navigation flex flex-col gap-1', className)} {...rest}>
			{children}
		</Component>
	)
}

// NavigationItem

export type NavigationItemElement = 'li' | 'a' | 'button'
export type NavigationItemProps<T extends NavigationItemElement> = ComponentPropsWithoutRef<T> & {
	as?: T
	active?: boolean
}

function NavigationItem<T extends NavigationItemElement = 'li'>(
	props: NavigationItemProps<T>,
	ref: ForwardedRef<HTMLElementTagNameMap[T]>,
) {
	const { as, className, active = false, children, ...rest } = props
	const Component = (as ?? 'li') as ElementType

	return (
		<Component
			ref={ref}
			className={cn(
				'ui-navigation__item flex rounded-md px-3 py-2 h-10',
				active && 'ui-active',
				className,
			)}
			{...rest}
		>
			{children}
		</Component>
	)
}

export default Object.assign(forwardRef(Navigation), {
	Item: forwardRef(NavigationItem),
})
