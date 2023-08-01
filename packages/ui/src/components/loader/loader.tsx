import { type ButtonHTMLAttributes, type ForwardedRef, forwardRef, memo } from 'react'

import { cn } from '../../helpers/class-names.js'
import './loader.css'

export type LoaderSize = 'sm' | 'md'

export interface LoaderProps extends Omit<ButtonHTMLAttributes<SVGSVGElement>, 'children'> {
	size?: LoaderSize
}

function Loader(props: LoaderProps, ref: ForwardedRef<SVGSVGElement>) {
	const { size = 'md', className, ...rest } = props

	return (
		<svg
			ref={ref}
			viewBox="0 0 50 50"
			className={cn(`ui-loader ui-size--${size}`, className)}
			{...rest}
		>
			<path
				d="M25 5a20.14 20.14 0 0120 17.88 2.51 2.51 0 002.49 2.26A2.52 2.52 0 0050 22.33a25.14 25.14 0 00-50 0 2.52 2.52 0 002.5 2.81A2.51 2.51 0 005 22.88 20.14 20.14 0 0125 5z"
				fill="currentcolor"
			/>
		</svg>
	)
}

export default memo(forwardRef(Loader))
