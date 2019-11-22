FROM alpine AS builder

# apt-get is Ubuntu's package manager
# Alpine does not have apt-get, so apk must be used instead
RUN apk add --no-cache --update nodejs nodejs-npm

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Set Environment variables
ENV NODE_ENV production

# Building your code for production
RUN npm ci --only=production


# ------------------------------------------------------------------------------------------


FROM alpine

# apt-get is Ubuntu's package manager
# Alpine does not have apt-get, so apk must be used instead
RUN apk add --no-cache --update nodejs nodejs-npm dumb-init bash

# Create app directory
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules

# Bundle app source
COPY . .

# Set Environment variables
ENV NODE_ENV production

# Do not run the app as root

# In default Node.js image we would run:
# RUN groupadd -r nodejs && useradd -m -r -g nodejs -s /bin/bash nodejs

# But Alpine uses adduser and addgroup rather than useradd and groupadd

# useradd -m, --create-home = Create the user's home directory if it does not exist.
# adduser    = by default creates a home directory.
#              If you do not want to create such a directory
#              use the --no-create-home flag
RUN addgroup --system nodejs && adduser -S -G nodejs -s /bin/bash nodejs

USER nodejs

EXPOSE 8080

# Runs "/usr/bin/dumb-init -- /my/script --with --args"
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD [ "npm", "start:pro" ]