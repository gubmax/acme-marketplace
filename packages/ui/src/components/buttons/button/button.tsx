import { type ReactNode } from 'react'

import './button.css'

export interface ButtonProps {
	children: ReactNode
	onClick: () => void
}

function Button({ children, onClick }: ButtonProps) {
	return (
		<button className="ui-button" onClick={onClick}>
			{children}
		</button>
	)
}

export default Button
