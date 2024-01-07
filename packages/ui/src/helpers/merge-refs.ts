import type { LegacyRef, MutableRefObject, RefCallback } from 'react'

/**
 * Merges multiple refs into a single function ref.
 * Refs can be mutable refs or function refs.
 */
export function mergeRefs<T>(...refs: Array<MutableRefObject<T> | LegacyRef<T>>): RefCallback<T> {
	return (value) => {
		for (const ref of refs) {
			if (typeof ref === 'function') ref(value)
			else if (ref != null) (ref as MutableRefObject<T | null>).current = value
		}
	}
}
