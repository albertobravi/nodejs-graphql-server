import { makeExecutableSchema } from 'graphql-tools';
import RecipeLoaders from '../dataloaders/Recipe';

const typeDefs = [`
type Recipe {
  _id: ID!
  title: String!
  body: String
}

type Query {
  recipeById(id: ID!): Recipe
  recipeByTitle(title: String!): Recipe
}

schema {
  query: Query
}`];

const resolvers = {
  Query: {
    recipeById: (_, { id }) => RecipeLoaders.ids.load(id),
    recipeByTitle: (_, { title }) => RecipeLoaders.titles.load(title),
  },
};

const RecipeSchema = makeExecutableSchema({ typeDefs, resolvers });

export default RecipeSchema;
