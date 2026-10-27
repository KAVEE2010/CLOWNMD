FROM node:20-alpine

RUN apk add --no-cache \
    ffmpeg \
    imagemagick \
    webp \
    git \
    python3 \
    make \
    g++

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]