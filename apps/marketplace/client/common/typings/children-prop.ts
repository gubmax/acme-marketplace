import type { ReactNode } from 'react'

export interface ChildrenProp<T extends ReactNode = ReactNode> {
	children: T
}
