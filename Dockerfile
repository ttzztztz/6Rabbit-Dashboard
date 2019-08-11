FROM node:alpine

RUN mkdir -p /var/app
WORKDIR /var/app

COPY . .
RUN cd /var/app && yarn && yarn build

CMD ["yarn", "run", "start"]