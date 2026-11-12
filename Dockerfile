# syntax=docker/dockerfile:1
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY cv /usr/share/nginx/html/cv
COPY shell /usr/share/nginx/html/shell
COPY img /usr/share/nginx/html/img
COPY trikids /usr/share/nginx/html/trikids
COPY trikentretiens /usr/share/nginx/html/trikentretiens
COPY trikinema /usr/share/nginx/html/trikinema
COPY legal /usr/share/nginx/html/legal
COPY privacy /usr/share/nginx/html/privacy
COPY terms /usr/share/nginx/html/terms
COPY favicon.ico favicon.svg favicon-48.png favicon-192.png apple-touch-icon.png icon-512.png robots.txt sitemap.xml /usr/share/nginx/html/
EXPOSE 80
