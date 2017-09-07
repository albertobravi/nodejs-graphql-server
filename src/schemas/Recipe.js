import { makeExecutableSchema } from 'graphql-tools';
import RecipeLoaders from '../dataloaders/Recipe';
import RecipeModel from '../models/Recipe';

const typeDefs = [`
type Recipe {
  id: ID!
  title: String!
  body: String
}

type RecipeStatus {
  message: String!
}

input UpdateRecipeInput {
  id: ID!
  title: String
  body: String
}

input DeleteRecipeInput {
  id: ID!
}

type Query {
  recipeById(id: ID!): Recipe
  recipeByTitle(title: String!): Recipe
}

type Mutation {
  updateRecipe(input: UpdateRecipeInput!): Recipe
  deleteRecipe(input: DeleteRecipeInput!): RecipeStatus
}

schema {
  query: Query,
  mutation: Mutation,
}
`];

const resolvers = {
  Query: {
    recipeById: (_, { id }) => RecipeLoaders.ids.load(id),
    recipeByTitle: (_, { title }) => RecipeLoaders.titles.load(title),
  },
  Mutation: {
    updateRecipe: (_, UpdateRecipeInput) => {
      return RecipeModel.findById(UpdateRecipeInput.input.id)
        .exec()
        .then((recipe) => {
          recipe.title = UpdateRecipeInput.input.title || recipe.title;
          recipe.body = UpdateRecipeInput.input.body || recipe.body;

          return recipe.save();
        })
        .then(null, err => err);
    },
    deleteRecipe: (_, DeleteRecipeInput) => {
      return RecipeModel.findByIdAndRemove(DeleteRecipeInput.input.id)
        .exec()
        .then((recipe) => {
          const RecipeStatus = { message: null };

          if (recipe) {
            RecipeStatus.message = `Recipe deleted (${DeleteRecipeInput.input.id})`;
          } else {
            RecipeStatus.message = `Recipe not found (${DeleteRecipeInput.input.id})`;
          }

          return RecipeStatus;
        })
        .then(null, err => err);
    },
  },
};

const RecipeSchema = makeExecutableSchema({ typeDefs, resolvers });

export default RecipeSchema;
