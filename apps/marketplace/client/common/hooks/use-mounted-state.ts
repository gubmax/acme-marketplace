import { useEffect, useState } from 'react'

export function useMountedState(): boolean {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	return isMounted
}
