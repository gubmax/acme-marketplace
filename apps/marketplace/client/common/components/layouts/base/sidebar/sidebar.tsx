import { memo } from 'react'
import HomeIcon from 'ui/components/icons/home-icon.js'
import InfoIcon from 'ui/components/icons/info-icon.js'
import SettingsIcon from 'ui/components/icons/settings-icon.js'
import Navigation from 'ui/components/navigation/navigation.js'

import { useStore } from 'client/common/hooks/use-store.js'
import { routeStore } from 'client/core/models/router-model.js'
import CustomNavigationItem from './components/custom-navigation-item.js'
import './sidebar.css'

const PATH_HOME = '/'
const PATH_ABOUT = '/about'
const PATH_SETTINGS = '/settings'

function Sidebar() {
	const { pathname } = useStore(routeStore)

	return (
		<aside className="m-sidebar flex flex-col bg-container px-3 pb-3">
			<div className="m-sidebar__logo inline-flex items-center">
				<a className="px-4 py-1 text-title-lg font-700" href="/">
					ACME
				</a>
			</div>
			<Navigation as="nav" className="grow-1">
				<CustomNavigationItem
					href={PATH_HOME}
					active={pathname === PATH_HOME}
					icon={HomeIcon}
					text="Home"
				/>
				<CustomNavigationItem
					href={PATH_ABOUT}
					active={pathname === PATH_ABOUT}
					icon={InfoIcon}
					text="About"
				/>
				<CustomNavigationItem
					className="mt-auto"
					href={PATH_SETTINGS}
					active={pathname === PATH_SETTINGS}
					icon={SettingsIcon}
					text="Settings"
				/>
			</Navigation>
		</aside>
	)
}

export default memo(Sidebar)
