import nodemon from 'nodemon'
import pc from 'picocolors'

console.log(pc.dim('Watcher enabled. To restart at any time, enter "rs"'))

nodemon({
	exec: 'tsx ./server/main.ts',
	ext: 'ts,tsx,json',
	ignore: ['*/node_modules/.vite'],
	watch: ['server/'],
})
	.on('restart', () => console.warn(pc.yellow('Server reload...')))
	.on('quit', () => process.exit())
