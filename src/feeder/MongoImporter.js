import fs from 'fs';
import RecipeModel from '../models/Recipe';

fs.readFile('./src/feeder/data.json', 'utf8', (err, data) => {
  if (err) throw err;
  const json = JSON.parse(data);
  const recipes = [];

  json.forEach((doc) => {
    const recipe = new RecipeModel({
      _id: doc.id,
      title: doc.title,
      body: doc.body,
    })
      .save();

    recipes.push(recipe);
  });

  Promise.all(recipes)
    .then(() => {
      console.log('Finish...');
      process.exit();
    })
    .catch(errModel => console.log(errModel));
});
