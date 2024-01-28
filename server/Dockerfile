# Set the base image to Node 18
FROM node:18.19-alpine3.18

# File Author / Maintainer
LABEL maintainer="Sawyer Blue Burnett"

# Copy dependencies
COPY package.json yarn.lock tsconfig.json ./
# Install dependencies
RUN yarn
COPY src/ ./src
RUN yarn build

EXPOSE 80