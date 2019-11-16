#!/usr/bin/env ash
PORT_FROM_ENV=$(printenv PORT)
PORT=${PORT_FROM_ENV:-"80"}

sed -i -E "s/CLOUD_RUN_PORT/${PORT}/g" /etc/nginx/nginx.conf
nginx -g 'daemon off;'
