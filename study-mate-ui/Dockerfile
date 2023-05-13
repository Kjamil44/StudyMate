FROM node:16-alpine

WORKDIR /study-mate-ui

COPY . .

RUN npm ci
RUN npm run build
RUN npm install -g serve

EXPOSE 3000

CMD /bin/sh /study-mate-ui/env.sh env-config && serve /study-mate-ui/build