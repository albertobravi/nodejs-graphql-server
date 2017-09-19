import dotenv from 'dotenv';

dotenv.config();

if (process.env.MONGO_URL === undefined) {
  throw new Error(`.env file not found. 
 
|------------------------|
| Try this:              |
|                        |
| cp .env.example .env   |
|------------------------|
`);
}

export default process.env;
