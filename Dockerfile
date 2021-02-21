FROM nginx:1.19

COPY ./build /var/www/

COPY ./nginx/default.conf /etc/nginx/conf.d

EXPOSE 80

CMD nginx -g "daemon off;"