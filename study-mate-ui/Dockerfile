FROM node:16-alpine

WORKDIR /study-mate-ui

COPY . .
COPY .env.production .env

RUN npm ci
RUN npm run build
RUN npm install -g serve

ENV NODE_ENV 'production'

EXPOSE 3000

ENTRYPOINT [ "serve", "build" ]