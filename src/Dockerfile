FROM node:18
WORKDIR /app
COPY server/server.js ./
COPY local.settings.json ./
EXPOSE 80
CMD [ "node", "server.js" ]
