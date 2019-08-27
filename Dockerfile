FROM node:alpine

RUN mkdir -p /var/app
WORKDIR /var/app

COPY . .
ENV NODE_ENV=production
RUN cd /var/app && yarn && yarn build

CMD ["yarn", "run", "start"]