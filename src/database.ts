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
  SALT_ROUNDS,
  TOKEN_SECRET,
} = process.env;

let client; 

if (NODE_ENV === 'dev') {
   client= new Pool({
      host: POSTGRES_HOST,
      database: POSTGRES_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      // @ts-ignore
      dbport: POSTGRES_PORT,
      salt: SALT_ROUNDS,
      pepper: BCRYPT_PASSWORD,
      tokenSecret: TOKEN_SECRET,
    });

}

if (NODE_ENV === 'test') {
   client = new Pool({
      host: POSTGRES_HOST,
      database: POSTGRES_TEST_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      port: POSTGRES_PORT as unknown as number
  });
}



export default client as Pool;
