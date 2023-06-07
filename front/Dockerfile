#STAGE 1
FROM node:14-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#STAGE 2
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./ssl/domain.crt /etc/ssl/nginx/
COPY ./ssl/domain.key /etc/ssl/nginx/
COPY --from=build /usr/src/app/build/ /usr/share/nginx/html