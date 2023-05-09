FROM node:16-alpine

WORKDIR /study-mate-ui

COPY . .

ARG STUDY_MATE_API_BASE_URL
ENV REACT_APP_STUDY_MATE_API_BASE_URL ${STUDY_MATE_API_BASE_URL}
ENV NODE_ENV 'production'

RUN npm ci
RUN npm run build
RUN npm install -g serve

EXPOSE 3000

ENTRYPOINT [ "serve", "build" ]