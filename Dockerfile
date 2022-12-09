FROM node:lts-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . /app

# RUN npm install pm2 -g

EXPOSE 3000

CMD [ "npm", "start" ]