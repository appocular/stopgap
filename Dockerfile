FROM node:8.14-alpine AS build
ARG REACT_APP_APPOCULAR_URL
ARG REACT_APP_FRONTEND_TOKEN

WORKDIR /app

ADD . /app

RUN npm install && npm run build

FROM joshix/caddy
COPY --from=build /app/build /var/www/html/
COPY Caddyfile /var/www/html/Caddyfile
