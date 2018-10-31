import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import RecipeSchema from './schemas/Recipe';

const app = express();

app.set('port', 8888);

app.set('view engine', 'pug');

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: RecipeSchema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.use('/', (req, res) => {
  res.render('index');
});

app.listen(app.get('port'), () => {
  console.log(`Now browse to http://localhost:${app.get('port')}/graphiql`);
});
