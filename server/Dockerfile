# Set the base image to Node 8.7
FROM node:10-alpine

# File Author / Maintainer
MAINTAINER Sawyer Blue Burnett

# Copy dependencies
COPY package.json yarn.lock ./
# Install dependencies
RUN yarn

COPY passport-setup.js server.js ./
# Copy rest of files
COPY models/ ./src
COPY routes/ ./routes

EXPOSE 80