import { memo } from 'react'
import ControllerIcon from 'ui/components/icons/controller-icon.js'
import GridViewIcon from 'ui/components/icons/grid-view-icon.js'
import HelpIcon from 'ui/components/icons/help-icon.js'
import InfoIcon from 'ui/components/icons/info-icon.js'
import SettingsIcon from 'ui/components/icons/settings-icon.js'
import ShoppingBagIcon from 'ui/components/icons/shopping-bag.js'
import Navigation from 'ui/components/navigation/navigation.js'

import { useStore } from 'client/common/hooks/use-store.js'
import { routeStore } from 'client/core/models/router-model.js'
import CustomNavigationItem from './components/custom-navigation-item.js'
import './sidebar.css'

const NAVIGATION_ITEMS = [
	{ href: '/', icon: GridViewIcon, text: 'Discover' },
	{ href: '/marketplace', icon: ShoppingBagIcon, text: 'Marketplace' },
	{ href: '/gaming', icon: ControllerIcon, text: 'Gaming' },
	{ href: '/settings', icon: SettingsIcon, text: 'Settings', className: 'mt-auto' },
	{ href: '/help', icon: HelpIcon, text: 'Help' },
	{ href: '/about', icon: InfoIcon, text: 'About' },
] as const

function Sidebar() {
	const { pathname } = useStore(routeStore)

	return (
		<aside className="m-sidebar flex flex-col bg-container px-3 pb-3">
			<div className="m-sidebar__logo inline-flex items-center">
				<a className="flex gap-2 px-3 py-1 text-title-lg font-700 rounded-md items-center" href="/">
					<img className="w-6 h-6" src="/favicon.svg" alt="logo" />
					ACME
				</a>
			</div>
			<Navigation as="nav" className="grow-1">
				{NAVIGATION_ITEMS.map((item, index) => (
					<CustomNavigationItem key={index} active={item.href === pathname} {...item} />
				))}
			</Navigation>
		</aside>
	)
}

export default memo(Sidebar)
