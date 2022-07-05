import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();
const {
  NODE_ENV,
  PORT,
  POSTGRES_PORT,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  
} = process.env;

const client = new Pool({
  host: POSTGRES_HOST,
  database: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: parseInt(POSTGRES_PORT as string, 10),
});

client.on('error', (error: Error) => {
  console.error(error.message);
});


export default client as Pool;
