FROM node:alpine

RUN mkdir -p /var/app
WORKDIR /var/app

COPY . .
ENV BUILD=prod
RUN cd /var/app && yarn && yarn build

CMD ["yarn", "run", "start"]