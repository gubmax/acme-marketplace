import { type ForwardedRef, forwardRef, type HTMLAttributes, isValidElement } from 'react'

import { cn } from '../../helpers/class-names.js'
import UserIcon from '../icons/user-icon.js'
import './avatar.css'

export type AvatarSize = 'sm' | 'md' | 'lg'

export interface AvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'placeholder'> {
	placeholder?: boolean
	size?: AvatarSize
}

function Avatar(props: AvatarProps, ref: ForwardedRef<HTMLDivElement>) {
	const { placeholder = false, size = 'md', className, style, children } = props

	return (
		<div ref={ref} className={cn('ui-avatar', `size--${size}`, className)} style={style}>
			{placeholder || !isValidElement(children) ? (
				<UserIcon size={size} className="fill-secondary" />
			) : (
				children
			)}
		</div>
	)
}

export default forwardRef(Avatar)
