#!/usr/bin/bash

if [ ! -f nginx/conf.d/https.conf ]; then
  echo "Installing SSL certificate."

  docker run --rm \
    --volume "$(pwd)/certbot/www:/var/www/html:rw" \
    --volume "$(pwd)/certbot/certificate:/etc/letsencrypt:rw" \
    certbot/certbot:latest certonly --webroot -w /var/www/html \
    -d $1 --agree-tos --email $2 -n && \
  mv nginx/conf.d/https.conf.disabled nginx/conf.d/https.conf && \
  docker-compose restart nginx

else
  echo "SSL certificate already installed."
fi
