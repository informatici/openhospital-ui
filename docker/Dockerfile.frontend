FROM node:lts-alpine

ENV PUBLIC_URL=/
ENV REACT_APP_USE_MOCK_API=
ENV REACT_APP_BASE_PATH=/

VOLUME /oh
WORKDIR /oh
COPY ./package*.json ./
# RUN npm ci --legacy-peer-deps

CMD npm ci --legacy-peer-deps; npm start
# CMD tail -f /dev/null