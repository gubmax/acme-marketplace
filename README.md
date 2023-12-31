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

- `apps/marketplace`: a React SSR app with client router
- `apps/storage`: a [Fastify](https://fastify.dev/) API for marketplace
- `packages/browserslist-config`: `browserslist` configurations
- `packages/eslint-config`: `eslint` configurations
- `packages/shared`: shared utilities
- `packages/typescript-config`: `tsconfig.json`s used throughout the monorepo
- `packages/ui`: a React component library shared by all frontend applications

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

[Prisma Migrate](https://www.prisma.io/docs/orm/prisma-migrate) enables you to:
- Keep your database schema in sync with your Prisma schema as it evolves and
- Maintain existing data in your database

[Prisma CLI reference](https://www.prisma.io/docs/reference/api-reference/command-reference#prisma-migrate). Example for `storage` package:

```sh
pnpm --filter=storage prisma migrate status
```

## Prisma Studio

Prisma Studio is a visual editor for the data in your database.
Starts at [localhost:5555](http://localhost:5555/).

 Example for `storage` package:

```sh
pnpm --filter=storage prisma studio
```

## Storybook

Storybook provides us with an interactive UI playground for our components. This allows us to preview our components in the browser and instantly see changes when developing locally.

Helpful scripts:
- `pnpm sb` - starts Storybook in dev mode with hot reloading at [localhost:6006](http://localhost:6006/)
- `pnpm sb.build` - builds the Storybook UI and generates the static HTML files

## Testing

### Unit testing
Via Vitest. It's a next generation testing framework powered by Vite.

[Vitest CLI reference](https://vitest.dev/guide/cli.html).
Helpful scripts:
- `pnpm test` - single run for all packages without watch mode
- `pnpm test.related` - run only tests that cover a list of source files
- `pnpm --filter=marketplace test.watch` - run all test suites but watch for changes and rerun tests when they change

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
