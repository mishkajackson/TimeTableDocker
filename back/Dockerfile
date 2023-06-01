FROM node:18-alpine as builder
WORKDIR /app
COPY  /*.json ./
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 4200
CMD [ "npm", "run", "prod" ]