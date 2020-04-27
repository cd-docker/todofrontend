# syntax = docker/dockerfile:experimental
FROM cypress/browsers:node12.8.1-chrome80-ff72
LABEL application=todofrontend

# Language settings
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

# Install build dependencies
RUN apt-get install -y rsync

# Copy package files
WORKDIR /app
COPY package*.json /app/

# Install packages
RUN --mount=type=cache,target=/root/.cache \
    --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/app/node_modules \
    --mount=type=cache,target=/build \
    npm install && \
    npm prune && \
    rsync -avh --delete /app/node_modules/ /build/node_modules/ && \
    rsync -avh --delete /root/.cache/Cypress/ /build/Cypress/

# Copy Cypress from temporary build cache
RUN --mount=type=cache,target=/build \
    rsync -avh --delete /build/node_modules/ /app/node_modules/ && \
    rsync -avh --delete /build/Cypress/ /root/.cache/Cypress/

# Copy application source
COPY . /app/