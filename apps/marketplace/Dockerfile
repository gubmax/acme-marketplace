# Stage 1
FROM node:20-alpine AS builder

ENV CI 1
WORKDIR /app

RUN apk add --no-cache libc6-compat git
RUN npm install -g turbo@1.10.12

COPY . .

RUN turbo prune --scope=marketplace --docker
###############################################################################
# Stage 2
FROM node:20-alpine AS store

ENV CI 1
WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm@8.9.0

COPY .npmrc pnpm-lock.yaml ./
RUN pnpm config set store-dir /app/.pnpm-store
RUN --mount=type=cache,id=pnpm,target=/app/.pnpm-store pnpm fetch
###############################################################################
# Stage 3
FROM store AS installer

COPY .gitignore .prettierrc ./
COPY --from=builder /app/out/json ./
COPY --from=builder /app/out/pnpm-lock.yaml .
RUN pnpm install --offline

COPY --from=builder /app/out/full/ ./

ENV NODE_ENV production
RUN pnpm build --filter=marketplace...
###############################################################################
# Stage 4
FROM store AS runner

ENV NODE_ENV production
ENV PORT 8000

COPY --from=builder /app/out/json ./
COPY --from=builder /app/out/pnpm-lock.yaml .
RUN pnpm pkg delete scripts.prepare
RUN pnpm install --offline

COPY --from=installer /app/apps/marketplace/dist ./apps/marketplace/
COPY --from=installer /app/packages/shared/dist ./packages/shared/src/

EXPOSE $PORT
USER node
WORKDIR /app/apps/marketplace

CMD ["node", "server/main"]
