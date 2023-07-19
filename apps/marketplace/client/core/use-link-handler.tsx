import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Turn all HTML <a> elements into client side router links, no special framework-specific <Link> component necessary!
 * @link https://gist.github.com/devongovett/919dc0f06585bd88af053562fd7c41b7
 */
export function useLinkHandler() {
	const navigate = useNavigate()

	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			const link = e.target instanceof Element ? e.target.closest('a') : null

			if (
				link &&
				link instanceof HTMLAnchorElement &&
				link.href &&
				(!link.target || link.target === '_self') &&
				link.origin === location.origin &&
				!link.hasAttribute('download') &&
				e.button === 0 && // left clicks only
				!e.metaKey && // open in new tab (mac)
				!e.ctrlKey && // open in new tab (windows)
				!e.altKey && // download
				!e.shiftKey &&
				!e.defaultPrevented
			) {
				e.preventDefault()
				navigate(link.getAttribute('href') ?? '')
			}
		}

		document.addEventListener('click', onClick)
		return () => document.removeEventListener('click', onClick)
	}, [navigate])
}
