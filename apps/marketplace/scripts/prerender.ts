/* eslint-disable @typescript-eslint/no-throw-literal */
/**
 * Pre-render the app into static HTML.
 * run `pnpm prerender` and then `dist/client` can be served as a static site.
 */
import fs from 'node:fs'
import { dirname } from 'node:path'

import fastify from 'fastify'
import pc from 'picocolors'

import { resolvePath } from 'server/common/helpers/paths.js'
import type { Renderer } from 'server/core/prod/renderer.js'

process.env.BUILD_ENV = 'prerendering'

console.log(
	`${pc.cyan('pre-render script')} ${pc.green('creating HTML files for static routes...')}`,
)

// @ts-expect-error: Production js without declaration file
const { renderer } = (await import('dist/server/core/prod/renderer')) as { renderer: Renderer }

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
	const pagePath = resolvePath(`dist/client/${pathWithFilename}`)

	fs.mkdirSync(dirname(pagePath), { recursive: true })
	fs.writeFileSync(pagePath, html)

	console.log(`${pc.dim('dist/client/')}${pc.green(pathWithFilename)}`)
}

// Pre-render app pages

for (const route of renderer.routesManifest) {
	if (!route.static) continue

	const res = await server.inject(route.path)
	if (res.statusCode >= 500) throw res.body

	writePageFile(`pages${route.path}`, res.body)
}

// Pre-render Not Found page

const notFoundRes = await server.inject('/404')
if (notFoundRes.statusCode >= 500) throw notFoundRes.body
writePageFile('404', notFoundRes.body)

// Pre-render Error page

const errorRes = await server.inject('/error')
if (errorRes.statusCode >= 500) throw notFoundRes.body
writePageFile('error', errorRes.body)
