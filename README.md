# 🛒 Acme Marketplace

This monorepository is a fullstack [Node.js](https://nodejs.org/about) application containing a modern [React](https://react.dev/) web app, server-side rendering, tooling, and APIs.

The frontend is developed without the use of meta frameworks like Next.js, Remix and Astro.

Implemented:
- Streaming Server-Side Rendering (SSR). This allows you to incrementally render parts of your UI to the client.
- File-system Routing. Every component in the "pages" directory becomes a route.
- Client router that preloads the page before displaying it.

## What's inside?

This repo includes the following packages/apps:

### Apps and Packages

- `marketplace`: a React SPA + SSR
- `cms`: a React SPA
- `storage`: a [Fastify](https://fastify.dev/) API for marketplace
- `ui`: a stub React component library shared by both `marketplace` and `cms` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

## Setup

The package manager used to install and link dependencies must be [pnpm](https://pnpm.io).

To begin developing the app, follow these steps in your shell:

```sh
docker compose up -d
pnpm i
pnpm codegen
pnpm --filter=storage prisma migrate dev
pnpm dev
```

## Migrations

[Prisma CLI reference](https://www.prisma.io/docs/reference/api-reference/command-reference#prisma-migrate). Example:

```sh
pnpm --filter=storage prisma migrate status
```

## Update Packages

Via [npm-check-updates](https://www.npmjs.com/package/npm-check-updates)

```sh
npx npm-check-updates --deep --upgrade
```

## Docker Local Build
Example for `frontend` package:
```sh
docker build . -f apps/marketplace/Dockerfile -t acme-marketplace
```

## Recommended settings

### Visual Studio Code

`vscode/settings.json`

```json
{
	"typescript.tsdk": "node_modules/typescript/lib",
	"files.associations": { "*.css": "css" },
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": true,
		"source.fixAll.stylelint": true
	},
	"eslint.workingDirectories": ["apps", "packages"],
	"unocss.root": ["apps/marketplace", "packages/ui"]
}
```
