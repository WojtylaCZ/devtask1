FROM node:10 as base

ENV NODE_ENV=production
ENV PORT=6010

WORKDIR /app

COPY . /app

RUN yarn install
RUN yarn build

FROM base
RUN yarn test

FROM base
EXPOSE $PORT
CMD [ "node", "./dist/src/index.js" ]
