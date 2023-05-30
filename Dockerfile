FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install

RUN npm run build

CMD [ "npm", "run", "serve" ]
