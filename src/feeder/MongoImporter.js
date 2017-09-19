import { exec } from 'child_process';
import dotenv from 'dotenv';
import url from 'url';

dotenv.config();

const mongoParams = url.parse(process.env.MONGO_URL);

const db = mongoParams.path ? mongoParams.path.replace(/\//, '') : '/';
const user = mongoParams.auth ? `-u ${mongoParams.auth.split(':')[0]}` : '';
const pass = mongoParams.auth ? `-p ${mongoParams.auth.split(':')[1]}` : '';

const command = `mongoimport -h ${mongoParams.host} --db ${db} \
  --collection recipes --drop ${user} ${pass} --file src/feeder/data.json`;

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.log(stderr);
  } else {
    console.log('Successfully imported the initial data.');
  }
});
