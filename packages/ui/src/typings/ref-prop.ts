import type { ForwardedRef } from 'react'

export interface RefProp<T> {
	innerRef?: ForwardedRef<T>
}
