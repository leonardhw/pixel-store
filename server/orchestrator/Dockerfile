FROM node:16.17

WORKDIR /server/orchestrator

ENV PORT=process.env.PORT

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]