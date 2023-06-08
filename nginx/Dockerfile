FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./ssl/domain.crt /etc/ssl/nginx/
COPY ./ssl/domain.key /etc/ssl/nginx/