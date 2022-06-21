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
  BCRYPT_PASSWORD,
  SALT_ROUND,
  TOKEN_SECRET,
} = process.env;


const client: Pool = new Pool({
  host: POSTGRES_HOST,
  database: NODE_ENV==="dev"? POSTGRES_DB : POSTGRES_TEST_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  // @ts-ignore
  dbport: POSTGRES_PORT,
  salt: SALT_ROUND,
  pepper: BCRYPT_PASSWORD,
  tokenSecret: TOKEN_SECRET,
});

export default client;
