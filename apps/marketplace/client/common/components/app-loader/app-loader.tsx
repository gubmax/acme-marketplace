import { memo } from 'react'

import './app-loader.css'

function AppLoader() {
	return (
		<div className="flex flex-col w-screen h-screen gap-5 justify-center items-center">
			<img className="w-1/4 max-w-32" src="/favicon.svg" alt="logo" />
			<span className="text-title-lg">
				Loading
				<span className="m-app-loader__dots absolute" />
			</span>
		</div>
	)
}

export default memo(AppLoader)
