# node-react-seed

## Quick start

```
docker-compose up
yarn install
yarn lerna:bootstrap
yarn build
yarn start
```

The first time you run the project, you'll also need to populate the DB:

```
cd packages/backend
yarn migrate
```

Be aware of an open `lerna` [bug](https://github.com/lerna/lerna/issues/2284) that orphans child processes when you exit the `run` command, so use the `yarn start` command only for demo purposes.

For development:

```
cd packages/backend
yarn start

cd packages/frontend
yarn start
```

For production builds, run (from the root directory):

```
yarn build
```

## Authentication

The project is configured with a demo Auth0 client.

Modify the backend [.env](./packages/backend/.env) and frontend [.env](./packages/frontend/.env) to contain your IDP configuration.

## Notes

Upgrade OpenAPI generator version in [openapitools.json](./openapitools.json) when [this bug](https://github.com/OpenAPITools/openapi-generator/issues/10164) gets resolved.