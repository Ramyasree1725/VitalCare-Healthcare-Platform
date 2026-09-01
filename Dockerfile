FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY vitalcare/package*.json ./vitalcare/

RUN npm install --omit=dev

COPY . .

EXPOSE 9090

ENV PORT=9090

CMD ["node", "vitalcare/src/server.js"]
