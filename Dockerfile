# Set the base image to Node 12
FROM node:12-alpine

# File Author / Maintainer
LABEL maintainer="Sawyer Blue Burnett"

# Copy dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn

# Copy rest of files
COPY src/ ./src
COPY public/ ./public
COPY scripts/ ./scripts
COPY config/ ./config
COPY .env ./.env

RUN yarn build
RUN yarn global add serve

EXPOSE 80