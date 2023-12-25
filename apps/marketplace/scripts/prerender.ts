/**
 * Pre-render the app pages into static HTML.
 */
import assert from 'node:assert'
import fs from 'node:fs'
import { dirname, resolve } from 'node:path'

import fastify from 'fastify'
import pc from 'picocolors'

console.log(
	`${pc.cyan('pre-render script')} ${pc.green('creating HTML files for static routes...')}`,
)

// Renderer

process.env.BUILD_ENV = 'prerendering'
const { renderer } = await import('server/core/prod/renderer.js')

// Init server

const server = await fastify()

for (const route of renderer.routesManifest) {
	server.get(route.path, async (req, res) => renderer.render(req, res, route.id))
}

server.get('/404', async (req, res) => renderer.render(req, res, 'client/404.tsx'))
server.get('/error', async (req, res) => renderer.render(req, res))

// Write html files

function writePageFile(path: string, html: string) {
	const pathWithFilename = `${path.endsWith('/') ? path + 'index' : path}.html`
	const pagePath = resolve(`dist/client/${pathWithFilename}`)

	fs.mkdirSync(dirname(pagePath), { recursive: true })
	fs.writeFileSync(pagePath, html)

	console.log(`${pc.dim('dist/client/')}${pc.green(pathWithFilename)}`)
}

// Pre-render app pages

for (const route of renderer.routesManifest) {
	if (!route.static) continue

	const res = await server.inject(route.path)
	assert(res.statusCode < 500, res.body)
	writePageFile(`pages${route.path}`, res.body)
}

// Pre-render Not Found page

const notFoundRes = await server.inject('/404')
assert(notFoundRes.statusCode < 500, notFoundRes.body)
writePageFile('404', notFoundRes.body)

// Pre-render Error page

const errorRes = await server.inject('/error')
assert(errorRes.statusCode < 500, errorRes.body)
writePageFile('error', errorRes.body)
