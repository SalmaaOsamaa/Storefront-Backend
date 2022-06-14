import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
    PORT,
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_DB,
    NODE_ENV,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    TOKEN_SECRET

} = process.env


console.log(NODE_ENV);

let client: Pool = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,    
    // @ts-ignore 
    salt: SALT_ROUNDS,
    pepper: BCRYPT_PASSWORD,
    tokenSecret: TOKEN_SECRET,
})





export default client