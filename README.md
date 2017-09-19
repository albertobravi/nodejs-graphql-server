# NodeJS GraphQL server
A GraphQL server written in NodeJS

[![Greenkeeper badge](https://badges.greenkeeper.io/albertobravi/nodejs-graphql-server.svg)](https://greenkeeper.io/)

## Requirements
- NodeJS
- MongoDB _(we need a URI so you can install Mongo in local or remote)_

## Getting started

- `cp .env.example .env` _(and edit as needed, insert the Mongo URI)_

- `yarn`

- `yarn import-data`

- `yarn start`

- Navigate to: [localhost:8888/graphql](http://localhost:8888/graphql)

## Graphiql

go here: [graphiql](http://localhost:8888/graphql/graphiql)

## Example queries

#### Create
```
mutation create($input: CreateRecipeInput!) {
  createRecipe(input: $input) {
    id
    title
    body
  }
}
---Params---
{
  "input": {
    "title": "Title created",
    "body": "Body created"
  }
}
```

#### Read
```
query read($id: ID!) {
  recipeById(id: $id) {
    title
    body
  }
}
---Params---
{
  "id": "591987bfb2c2a737588dcfc1"
}
```

#### Update
```
mutation update($input: UpdateRecipeInput!) {
  updateRecipe(input: $input) {
    title
    body
  }
}
---Params---
{
  "input": {
    "id": "591987bfb2c2a737588dcfc1",
    "title": "Title edited",
    "body": "Body edited"
  }
}
```

#### Delete
```
mutation delete($input: DeleteRecipeInput!) {
  deleteRecipe(input: $input) {
    message
  }
}
---Params---
{
  "input": {
    "id": "591987bfb2c2a737588dcfc1"
  }
}
```
