# NodeJS GraphQL server
A GraphQL server written in NodeJS

## Getting started

- Create a file `.env` with a valid MongoDB connection url
```
MONGO_URL=...
```

- `yarn` 

- `yarn watch`

## Graphiql

go here: [graphiql](http://localhost:8888/graphql/graphiql)

## Database schema (Example)

```json
{
    "_id": {
        "$oid": "1a2b3c4d5e6f7g8h9i"
    },
    "title": "Lorem ipsum dolor sit amet",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}
```
