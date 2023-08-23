import type { ElementType } from 'react'
import Navigation from 'ui/components/navigation/navigation.js'
import { cn } from 'ui/helpers/class-names.js'
import type { StyledProps } from 'ui/typings/styled-props.js'

interface CustomNavigationItemProps extends StyledProps {
	active: boolean
	href: string
	icon: ElementType
	text: string
}

function CustomNavigationItem({
	active,
	className,
	href,
	icon: Icon,
	text,
}: CustomNavigationItemProps) {
	return (
		<Navigation.Item
			as="a"
			className={cn('text-body-lg gap-2 text-secondary font-500', className)}
			href={href}
			active={active}
		>
			<Icon className={active ? 'fill-accent' : 'fill-secondary'} />
			{text}
		</Navigation.Item>
	)
}

export default CustomNavigationItem
