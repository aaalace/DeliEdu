FROM node:20-alpine

WORKDIR /app

COPY package*.json package-lock*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

RUN npm install -g serve