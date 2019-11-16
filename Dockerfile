FROM nginx:1.17-alpine

COPY dist/browser /var/www/
COPY deploy/entrypoint.sh /entrypoint.sh
COPY deploy/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["/entrypoint.sh"]
