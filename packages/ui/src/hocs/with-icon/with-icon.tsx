import type { ElementType } from 'react'

import { cn } from '../../helpers/class-names.js'
import './with-icon.css'

export type IconSize = 'sm' | 'md' | 'lg'

export interface IconProps {
	className?: string
	size?: IconSize
}

export function withIcon(Component: ElementType<IconProps>): ElementType<IconProps> {
	function Icon({ size = 'md', className, ...rest }: IconProps) {
		return <Component className={cn('ui-icon', `ui-size--${size}`, className)} {...rest} />
	}

	return Icon
}
