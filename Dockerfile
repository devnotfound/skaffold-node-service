FROM node:14.16.0 as base

# setup tini wrapper -> https://github.com/krallin/tini#using-tini
# dont rely on the container runtime to have this feature
COPY infra/docker/tini /tini
RUN chmod +x /tini
ENTRYPOINT [ "/tini", "--" ]

ARG NODE_ENV=production
ARG USER=node
RUN mkdir /app
WORKDIR /app

COPY app/package*.json /app/
RUN npm ci

COPY app /app
COPY certs /certs
RUN chmod +r /certs/server.cert /certs/server.key

EXPOSE 8443

USER ${USER}
# uncomment the CMD if you are running the container in isolation
# CMD ["node", "src/index.js"]