FROM node:16.17

WORKDIR /server/services/users

ENV PORT=process.env.PORT

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]