import DataLoader from 'dataloader';
import RecipeModel from '../models/Recipe';

function getRecipesBatch(keys, field) {
  return new Promise((fulfill, reject) => {
    const query = {};
    query[field] = { $in: keys };

    return RecipeModel.find(query, (err, docs) => {
      if (err) {
        reject(err);
      }

      const results = [];

      docs.forEach((doc) => {
        results.push(doc);
      });

      fulfill(results);
    });
  });
}

function getRecipesIdsBatch(keys) {
  return getRecipesBatch(keys, '_id');
}

function getRecipesTitlesBatch(keys) {
  return getRecipesBatch(keys, 'title');
}

const RecipeLoaders = {
  ids: new DataLoader(keys => getRecipesIdsBatch(keys)),
  titles: new DataLoader(keys => getRecipesTitlesBatch(keys)),
};

export default RecipeLoaders;
