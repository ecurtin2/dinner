FROM node:15.9.0 as base
ADD . /app
WORKDIR /app
RUN yarn install
FROM base as build
ENTRYPOINT ["yarn", "run", "build"]

FROM base as dev
ENTRYPOINT ["yarn", "run", "start"]