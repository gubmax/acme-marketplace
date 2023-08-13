import { memo } from 'react'
import Button from 'ui/components/buttons/button/button.js'

import './not-found.css'

function NotFound() {
	return (
		<section className="flex flex-col justify-center items-center">
			<div className="m-not-found__text text-secondary mb-5 font-700">404</div>
			<h1 className="text-display-sm mb-3">Whoops! Page Not Found.</h1>
			<span className="mb-5 text-body-lg text-secondary">
				The link you followed may be broken, or the page may have been removed.
			</span>
			<Button as="a" variant="tonal" size="lg" href="/">
				Go home
			</Button>
		</section>
	)
}

export default memo(NotFound)
