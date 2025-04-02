FROM node:21

WORKDIR /app/client

COPY public src package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]