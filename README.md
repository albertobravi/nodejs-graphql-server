# NodeJS GraphQL server
A GraphQL server written in NodeJS

[![Greenkeeper badge](https://badges.greenkeeper.io/albertobravi/nodejs-graphql-server.svg)](https://greenkeeper.io/)

## Getting started

- `cp .env.example .env` (and edit as needed)

- `yarn import-data`

- `yarn start`

## Graphiql

go here: [graphiql](http://localhost:8888/graphql/graphiql)

## Database schema (Example)

Collection name: `recipes`
```json
{
    "_id": {
        "$oid": "1a2b3c4d5e6f7g8h9i"
    },
    "title": "Lorem ipsum dolor sit amet",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}
```
