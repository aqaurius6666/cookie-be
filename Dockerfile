FROM node:16.13.2-alpine as deps

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

FROM node:16.13.2-alpine as runner

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

CMD ["yarn", "start"]