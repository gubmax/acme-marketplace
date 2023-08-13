import { cn } from 'ui/helpers/class-names.js'
import type { ChildrenProp } from 'ui/typings/children-prop.js'
import type { StyledProps } from 'ui/typings/styled-props.js'

import Footer from './footer/footer.js'
import Header from './header/header.js'
import Sidebar from './sidebar/sidebar.js'
import './base-layout.css'

function BaseLayout({ className, style, children }: ChildrenProp & StyledProps) {
	return (
		<div className="m-base-layout">
			<Sidebar />
			<div className="w-full" style={style}>
				<Header />
				<main className={cn('m-base-layout__main mx-auto px-10 pt-22 pb-20', className)}>
					{children}
				</main>
				<Footer />
			</div>
		</div>
	)
}

export default BaseLayout
