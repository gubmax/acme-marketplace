import { memo } from 'react'

import './footer.css'

const TEXT_COPYRIGHT = `Site design / logo © ${new Date().getFullYear()} Acme Corporation`

function Footer() {
	return (
		<footer className="m-footer">
			<div className="m-footer__wrapper mx-auto text-secondary p-5">{TEXT_COPYRIGHT}</div>
		</footer>
	)
}

export default memo(Footer)
