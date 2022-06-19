"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { PORT, POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_TEST_DB, NODE_ENV, BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET } = process.env;
console.log(NODE_ENV);
let client = new pg_1.Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    // @ts-ignore 
    salt: SALT_ROUNDS,
    pepper: BCRYPT_PASSWORD,
    tokenSecret: TOKEN_SECRET,
});
exports.default = client;
