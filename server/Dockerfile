FROM node:21


WORKDIR /app/server


COPY package.json package-lock.json ./

RUN npm install


COPY . .


EXPOSE 9000


CMD ["npm", "start"]