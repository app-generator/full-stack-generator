# Cheat Sheet

## Quick start

```
$ npm install
$ npm run generate:spec
$ npm run generate:api
```

The first time you run the project, you'll also need to populate the DB:

```
$ npm run backend:migrate
```

For development:

```
$ mpm run backend:start

$ npm run frontend:start
```

For production builds, run (from the root directory):

```
$ npm run build
```

## DB Migrations

For the migration that creates the DB from the typeorm entities (run from `packages/backend`):

```
$ npm run migrate:bootstrap
```

To create a new, blank, migration: 

```
$ npm run migrate:create -n MigrationName
```

## Frontend UI selection

Use the following scripts to select between the provided UI alternatives:

```
$ cd packages/frontend

$ npm run select-ui:mui
$ npm run select-ui:chakra
$ npm run select-ui:bootstrap
```
