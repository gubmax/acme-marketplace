FROM mcr.microsoft.com/devcontainers/javascript-node:20

ENV CI 0
ENV NODE_ENV development

WORKDIR /workspace

RUN apt-get -y install git

RUN npm install -g pnpm@8.15.1
RUN pnpm config set store-dir /workspace/.pnpm-store

CMD [ "sleep", "infinity" ]
