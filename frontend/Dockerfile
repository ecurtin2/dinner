FROM node:17.3 as base

WORKDIR /app
# https://stackoverflow.com/questions/69665222/node-17-0-1-gatsby-error-digital-envelope-routinesunsupported-err-ossl-evp
ENV NODE_OPTIONS=--openssl-legacy-provider
ADD package.json .
RUN yarn install
ADD . .
WORKDIR /app

FROM base as build
RUN yarn run build

FROM nginx as prod
COPY nginx_default.conf /etc/nginx/nginx.conf
COPY --from=build /app/build/* /usr/share/nginx/html/
RUN mkdir -p /usr/share/nginx/html/static \
    && mv /usr/share/nginx/html/js /usr/share/nginx/html/static \
    && mv /usr/share/nginx/html/css /usr/share/nginx/html/static

FROM base as dev
ENTRYPOINT ["yarn", "run", "start"]