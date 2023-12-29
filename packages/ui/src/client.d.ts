/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

import 'react'

declare module 'react' {
	function forwardRef<T, P = Record<string, never>>(
		render: (props: P, ref: ForwardedRef<T>) => ReactElement | null,
	): (props: P & RefAttributes<T>) => ReactElement | null
}
