# build
FROM node:lts AS build
WORKDIR /build
COPY . ./
RUN yarn && yarn build

# run
FROM node:lts
WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn install --production

COPY --from=build /build/dist ./dist

CMD node dist/shared/infra/http/server.js
