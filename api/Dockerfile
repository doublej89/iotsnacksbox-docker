FROM node:14.19
WORKDIR /usr/src/app/api
COPY package.json .
RUN npm install --only=production   

COPY . ./

EXPOSE 5000
CMD ["node", "app.js"]