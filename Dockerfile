FROM node:16.13.2-alpine as deps

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build:production

FROM node:16.13.2-alpine as runner 

WORKDIR /app

COPY package.json yarn.lock ./

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/dist ./dist

RUN ls -a dist
EXPOSE 3000

CMD ["yarn", "start"]