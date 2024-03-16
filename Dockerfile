ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-alpine

ARG PORT=8081
ENV PORT $PORT
EXPOSE $PORT

RUN yarn add @expo/ngrok@^4.1.0

WORKDIR /opt/food-app

COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean

COPY . .

CMD ["npx", "expo", "start", "--tunnel"]