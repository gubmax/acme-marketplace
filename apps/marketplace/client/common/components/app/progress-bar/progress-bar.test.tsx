import { render } from '@testing-library/react'

import ProgressBar from './progress-bar.js'

test('render progress bar without loading state', () => {
	const wrapper = render(<ProgressBar />)
	const hr = wrapper.container.querySelector('.m-progress-bar')

	expect(hr?.className).toBe('m-progress-bar m-loading-end')
})
