# Acme Marketplace

This monorepository is a fullstack application containing a modern [React](https://react.dev/) web app, server-side rendering, tooling, and APIs.

## What's inside?

This repo includes the following packages/apps:

### Apps and Packages

- `marketplace`: a [React](https://react.dev/) MPA
- `cms`: a [React](https://react.dev/) SPA
- `storage`: a [Fastify](https://fastify.dev/) API for marketplace
- `ui`: a stub React component library shared by both `marketplace` and `cms` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

### Utilities

This repo has some additional tools:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

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

## [Migrations](https://www.prisma.io/docs/reference/api-reference/command-reference#prisma-migrate)

Example:

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

### [Visual Studio Code](https://code.visualstudio.com/docs/getstarted/settings#_workspace-settingsjson-location)

`.vscode/settings.json`

```json
{
	"typescript.tsdk": "node_modules/typescript/lib",
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": true,
		"source.fixAll.stylelint": true
	},
	"eslint.workingDirectories": ["apps", "packages"],
	"unocss.root": ["packages/ui", "apps/marketplace"]
}
```
