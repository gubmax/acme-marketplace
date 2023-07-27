import { type ReactNode, useEffect } from 'react'
import {
	toast,
	Toaster,
	type ToastOptions,
	type ToastPosition,
	useToasterStore,
} from 'react-hot-toast'
import { cn } from 'src/helpers/class-names.js'
import { useEffectOnce } from 'src/hooks/use-effect-once.js'

import './toast.css'

// ToastContainer

interface ToastContainerProps {
	limit?: number
	position?: ToastPosition
}

const ToastContainer = ({ limit = 5, position }: ToastContainerProps) => {
	const { toasts } = useToasterStore()

	useEffectOnce(() => {
		toasts.forEach((t) => toast.remove(t.id))
	})

	useEffect(() => {
		toasts
			.filter((t) => t.visible)
			.filter((_, i) => i >= limit)
			.forEach((t) => toast.remove(t.id))
	}, [limit, toasts])

	return <Toaster position={position ?? 'bottom-center'} />
}

// Toast

export interface CustomToast
	extends Pick<ToastOptions, 'duration' | 'className' | 'style' | 'ariaProps'> {
	content?: ReactNode
}

function customToast(props: CustomToast): void {
	toast.custom(
		(t) => (
			<div
				className={cn(
					'ui-toast ui-inner-shadow flex items-center bg-outline py-4 px-6 rounded-lg',
					t.visible ? 'animate--enter' : 'animate--leave',
					t.className,
				)}
				style={t.style}
				{...t.ariaProps}
			>
				{props.content}
			</div>
		),
		props,
	)
}

customToast.remove = (toastId: string) => toast.remove(toastId)

export { customToast as toast, ToastContainer, useToasterStore }
