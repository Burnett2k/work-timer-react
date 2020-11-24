# Set the base image to Node 12
FROM node:12-alpine

# File Author / Maintainer
LABEL maintainer="Sawyer Blue Burnett"

# Copy dependencies
COPY package.json yarn.lock ./
# Install dependencies
RUN yarn

COPY passport-setup.js server.js ./
# Copy rest of files
COPY models/ ./models
COPY routes/ ./routes
COPY controllers/ ./controllers

EXPOSE 80