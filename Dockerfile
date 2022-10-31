FROM node

COPY ./packages/backend/dist /backend
COPY ./packages/backend/.env /backend
COPY ./packages/backend/package.json.docker /backend/package.json
COPY ./packages/generated /generated-api

COPY ./api-bundle.yaml /api.yaml

WORKDIR /backend
RUN npm i

ENV PORT=4000
ENV API_PATH=/api.yaml

EXPOSE 4000

CMD node index.js 