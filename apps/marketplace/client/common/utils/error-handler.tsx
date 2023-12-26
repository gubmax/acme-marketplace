import type { ReactNode } from 'react'
import { toast } from '@acme/ui/components/toast/toast.js'

function handleError(error: unknown, defaultContent: ReactNode) {
	let content = defaultContent

	if (error instanceof Error) {
		content = error.message
	} else if (
		typeof error === 'object' &&
		error !== null &&
		'message' in error &&
		typeof error.message === 'string'
	) {
		content = error.message
	}

	toast({ content, duration: Infinity })
}

// Listeners

window.addEventListener('error', (event) => {
	handleError(event.error, 'Unrecognized error')
})

window.addEventListener('unhandledrejection', (event) => {
	handleError(event.reason, 'Unhandled rejection')
})
