FROM node:lts-alpine as builder
LABEL maintainer="HcgRandon <randon@dyno.gg>"

# Install Doppler CLI
RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add doppler

# setup registry
ARG ORG_GITHUB_TOKEN
ARG DOPPLER_TOKEN
ARG DOPPLER_CONFIG
ARG DOPPLER_PROJECT

# copy source for build
COPY . /build
WORKDIR /build

# setup .npmrc
RUN echo "@dynogg:registry=https://npm.pkg.github.com" | tee -a .npmrc
RUN echo "//npm.pkg.github.com/:_authToken=${ORG_GITHUB_TOKEN}" | tee -a .npmrc

# install dependencies and build project
RUN npm install && \
	doppler run -c $DOPPLER_CONFIG -p $DOPPLER_PROJECT -t $DOPPLER_TOKEN -- npm run build:prod

# prepare final image
FROM node:lts-alpine

# create user
RUN adduser -Sh /app dyno

# copy raw source & build from builder
COPY . /app
COPY --from=builder /build/.npmrc /app/.npmrc
COPY --from=builder /build/.next /app/.next

# fix perms
RUN chown -R dyno /app

# drop privileges
USER dyno
WORKDIR /app

# Install depends for prod
RUN npm install --omit=dev && \
	npm cache clean --force

CMD ["npm", "run", "start:prod"]
