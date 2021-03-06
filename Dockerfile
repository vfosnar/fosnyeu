FROM node:14-alpine

WORKDIR /opt/source

COPY . ./

RUN apk add --no-cache yarn \
 && yarn \
 && yarn build

CMD ["yarn", "start"]
