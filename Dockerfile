FROM node:8 as react-build
COPY . /srv/
WORKDIR /srv
ARG node_env
ARG api_host
ENV NODE_ENV=${node_env}
ENV REACT_APP_API_HOST=${api_host}
ENV GENERATE_SOURCEMAP=false
#ENV REACT_APP_THEME=mtn
ENV REACT_APP_TITLE="NoFunds"
#ENV REACT_APP_ORGANISATION=mtn_dep
ENV NODE_PATH=./src
RUN yarn install
RUN yarn build

FROM alpine:latest
WORKDIR /srv
COPY --from=react-build /srv/build /srv