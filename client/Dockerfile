FROM node:12.18.3 as client
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package*.json /app/
RUN npm install
RUN npm install react-scripts -g
COPY . .
RUN yarn build
FROM nginx:latest
EXPOSE 80
COPY --from=client /app/build/ /var/www/html
COPY /nginx/nginx.conf /etc/nginx/nginx/conf.d
CMD ["nginx","-g","daemon off;"]