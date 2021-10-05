# Cheat Sheet

## Quick start

```
$ yarn install
$ mkdir packages/generated  # this directory must exist
$ yarn lerna:bootstrap
$ yarn generate:spec
$ yarn generate:api
```

The first time you run the project, you'll also need to populate the DB:

```
$ cd packages/backend
$ yarn migrate
```

Be aware of an open `lerna` [bug](https://github.com/lerna/lerna/issues/2284) that orphans child processes when you exit the `run` command, so use the `yarn start` command only for demo purposes.

For development:

```
$ cd packages/backend
$ yarn start

$ cd packages/frontend
$ yarn start
```

For production builds, run (from the root directory):

```
$ yarn build
```

## DB Migrations

For the migration that creates the DB from the typeorm entities (run from `packages/backend`):

```
$ yarn migrate:bootstrap
```

To create a new, blank, migration: 

```
$ yarn migrate:create -n MigrationName
```

## Frontend UI selection

Use the following scripts to select between the provided UI alternatives:

```
$ cd packages/frontend

$ yarn select-ui:mui
$ yarn select-ui:chakra
$ yarn select-ui:bootstrap
```
