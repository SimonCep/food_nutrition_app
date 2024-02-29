ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-alpine

# ARG NODE_ENV=development
# ENV NODE_ENV $NODE_ENV

ARG PORT=8081
ENV PORT $PORT
EXPOSE $PORT

# ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
# ENV PATH /home/node/.npm-global/bin:$PATH

# RUN npm i -g npm@latest

RUN yarn add @expo/ngrok@^4.1.0

WORKDIR /opt/food-app

COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean

COPY . .

CMD ["npx", "expo", "start", "--tunnel"]