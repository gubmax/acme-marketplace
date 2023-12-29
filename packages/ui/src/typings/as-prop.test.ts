import type { AsProp } from './as-prop.js'

test('should have specific button prop', () => {
	assertType<AsProp<'button'>>({ as: 'button', name: 'string' })
})

test('should have specific anchor prop', () => {
	assertType<AsProp<'a'>>({ as: 'a', href: 'string' })
})
