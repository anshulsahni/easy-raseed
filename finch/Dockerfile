FROM node:14.15.4

WORKDIR /app

COPY . /app

RUN npm ci

EXPOSE 8888

ENTRYPOINT [ "npm", "run", "start:server" ]
