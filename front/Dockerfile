#STAGE 1
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm cl
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start" ]