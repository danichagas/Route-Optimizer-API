FROM node:20-apline AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run builder

FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD [ "node", "dist/main" ]