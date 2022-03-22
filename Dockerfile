FROM node:lts

WORKDIR /app

CMD yarn ts-node-dev -r tsconfig-paths/register --inspect --transpile-only --ignore-watch node_modules src/shared/infra/http/server.ts
