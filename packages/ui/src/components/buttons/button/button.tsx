import { cn } from '../../../helpers/class-names.js'
import type { ChildrenProp } from '../../../typings/children-prop.js'
import type { StyledProps } from '../../../typings/styled-props.js'
import './button.css'

export interface ButtonProps extends ChildrenProp, StyledProps {
	onClick?: () => void
}

function Button({ className, style, children, onClick }: ButtonProps) {
	return (
		<button type="button" className={cn('ui-button', className)} style={style} onClick={onClick}>
			{children}
		</button>
	)
}

export default Button
