# multi-stage build for production
FROM node:20-alpine AS build

WORKDIR /app

# copy package files first to leverage caching
COPY package.json package-lock.json* ./

# install deps
RUN npm ci --silent

# copy rest and build
COPY . .
RUN npm run build

# serve with nginx
FROM nginx:stable-alpine

# remove default nginx index (optional)
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
