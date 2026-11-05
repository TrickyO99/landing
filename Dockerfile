# syntax=docker/dockerfile:1
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY cv /usr/share/nginx/html/cv
COPY shell /usr/share/nginx/html/shell
COPY img /usr/share/nginx/html/img
EXPOSE 80
