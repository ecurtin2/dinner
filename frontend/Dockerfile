FROM node:15.9.0 as base
ADD . /app
WORKDIR /app
RUN yarn install


FROM base as build
RUN yarn run build
ENTRYPOINT ["echo", "hi"]

FROM nginx as prod
ADD nginx_default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build/* /usr/share/nginx/html/

FROM base as dev
ENTRYPOINT ["yarn", "run", "start"]