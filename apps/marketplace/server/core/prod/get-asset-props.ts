export function getAssetProps(file: string, isEntry = false): Record<string, unknown> | null {
	if (file.endsWith('.js')) {
		if (isEntry) return { type: 'module', crossOrigin: '', src: file }
		return { rel: 'modulepreload', crossOrigin: '', href: file }
	} else if (file.endsWith('.css')) {
		return { rel: 'stylesheet', crossOrigin: '', href: file }
	} else if (file.endsWith('.woff')) {
		return { rel: 'preload', href: file, as: 'font', type: 'font/woff', crossorigin: '' }
	} else if (file.endsWith('.woff2')) {
		return { rel: 'preload', href: file, as: 'font', type: 'font/woff2', crossorigin: '' }
	} else if (file.endsWith('.gif')) {
		return { rel: 'preload', href: file, as: 'image', type: 'image/gif' }
	} else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
		return { rel: 'preload', href: file, as: 'image', type: 'image/jpeg' }
	} else if (file.endsWith('.png'))
		return { rel: 'preload', href: file, as: 'image', type: 'image/png' }
	else return null
}
