import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';
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

input CreateRecipeInput {
  title: String
  body: String
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
  createRecipe(input: CreateRecipeInput!): Recipe
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
    createRecipe: (_, CreateRecipeInput) => {
      return new RecipeModel({
        _id: mongoose.Types.ObjectId(),
        title: CreateRecipeInput.input.title,
        body: CreateRecipeInput.input.body,
      })
        .save()
        .then(recipe => recipe)
        .then(null, err => err);
    },
    updateRecipe: (_, UpdateRecipeInput) => {
      return RecipeModel.findById(UpdateRecipeInput.input.id)
        .exec()
        .then((recipe) => {
          recipe.set({
            title: UpdateRecipeInput.input.title || recipe.title,
            body: UpdateRecipeInput.input.body || recipe.body
          });

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
