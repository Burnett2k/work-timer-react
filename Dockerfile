# Set the base image to Node 8.7
FROM node:10-alpine

# File Author / Maintainer
MAINTAINER Sawyer Blue Burnett

# Copy dependencies
COPY package.json yarn.lock .eslintrc ./
# Install dependencies
RUN yarn

# Copy rest of files
COPY src/ ./src
COPY public/ ./public
COPY scripts/ ./scripts
COPY config/ ./config

RUN yarn build
RUN yarn global add serve

EXPOSE 80