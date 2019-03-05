FROM node:10

WORKDIR /var/www/client

COPY client/package.json .

RUN npm install

COPY ./client .

RUN npx webpack

CMD ["npm", "start"]