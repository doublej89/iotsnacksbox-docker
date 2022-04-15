FROM node:14.19
WORKDIR /usr/src/app/client
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4200

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=4200
CMD ["npm", "start"]
