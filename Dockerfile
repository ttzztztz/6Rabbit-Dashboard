FROM node:alpine

RUN mkdir -p /var/app
WORKDIR /var/app

COPY . .
RUN yarn && yarn build

CMD ["yarn", "run", "start"]