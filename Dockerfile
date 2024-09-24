FROM node:20-alpine
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run standalone



#Runtime stage installes nodejs to make the container smaller
FROM alpine:3.20
RUN apk update && apk add --no-cache nodejs
RUN addgroup -S node && adduser -S node -G node
USER node
RUN mkdir /home/node/code && chown -R node:node /home/node/code
WORKDIR /home/node/code
COPY --from=0 /app/.next/standalone .
EXPOSE 3000
CMD [ "node", "server.js" ]