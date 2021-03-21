# Set the base image to Node 12
FROM node:12-alpine

# File Author / Maintainer
LABEL maintainer="Sawyer Blue Burnett"

# Copy dependencies
COPY package.json yarn.lock tsconfig.json yarn.lock ./
# Install dependencies
RUN yarn
COPY src/ ./src
RUN yarn build

EXPOSE 80