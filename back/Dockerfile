FROM node:18-alpine as builder
WORKDIR /app
COPY  /*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 4200
CMD [ "node", "dist/main.js" ]