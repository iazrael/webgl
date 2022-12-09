FROM node:lts-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]