FROM mcr.microsoft.com/devcontainers/javascript-node:18

ENV CI 0
ENV NODE_ENV development

WORKDIR /workspace

RUN apt-get -y install git

RUN npm install -g pnpm@8.6.10
RUN pnpm config set store-dir /workspace/.pnpm-store

CMD [ "sleep", "infinity" ]
