import { memo } from 'react'

import './footer.css'

const TEXT_COPYRIGHT = `Site design / logo © ${new Date().getFullYear()} Acme Corporation`

function Footer() {
	return <footer className="m-footer text-secondary px-10 py-5">{TEXT_COPYRIGHT}</footer>
}

export default memo(Footer)
