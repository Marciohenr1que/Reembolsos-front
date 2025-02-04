FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

FROM nginx:alpine AS production
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE ${NGINX_PORT}
CMD ["nginx", "-g", "daemon off;"]

FROM node:18-alpine AS development
WORKDIR /app


COPY package*.json ./
RUN npm install


EXPOSE ${VITE_PORT}
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
