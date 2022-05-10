FROM node:gallium-alpine

ENV GOOGLE_APPLICATION_CREDENTIALS service_key.json

VOLUME ["/root"]

ADD setup-ffmpeg.sh /root
RUN ["chmod", "+x", "/root/setup-ffmpeg.sh"]

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
COPY . .