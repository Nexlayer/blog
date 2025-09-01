# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN mkdir blog
COPY --from=builder /app/build ./blog

# Replace default.conf with our own
RUN rm -rf /etc/nginx/conf.d/*
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

