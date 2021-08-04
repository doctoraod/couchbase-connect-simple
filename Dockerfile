FROM node:12

LABEL maintainer="couchbase-connect-simple"

WORKDIR /app

RUN apt-get update --fix-missing && apt-get install -y \
    build-essential python\
    jq curl

EXPOSE 8080
