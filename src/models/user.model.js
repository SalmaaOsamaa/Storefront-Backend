"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
const hashPassword = (password) => {
    const salt = parseInt(process.env.salt, 10);
    return bcrypt_1.default.hashSync(`${password}${process.env.pepper}`, salt);
};
class UserModel {
    // create new user
    async create(u) {
        try {
            const connection = await database_1.default.connect();
            const sql = `INSERT INTO users (email, user_name, first_name, last_name, password) 
                  values ($1, $2, $3, $4, $5) 
                  RETURNING id, email, user_name, first_name, last_name`;
            const result = await connection.query(sql, [
                u.email,
                u.user_name,
                u.first_name,
                u.last_name,
                hashPassword(u.password),
            ]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to create (${u.user_name}): ${error.message}`);
        }
    }
    // get all users
    async getMany() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT id, email, user_name, first_name, last_name from users';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Error at retrieving users ${error.message}`);
        }
    }
    // get specific user
    async getOne(id) {
        try {
            const sql = `SELECT id, email, user_name, first_name, last_name FROM users 
      WHERE id=($1)`;
            const connection = await database_1.default.connect();
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not find user ${id}, ${error.message}`);
        }
    }
    // update user
    async updateOne(u) {
        try {
            const connection = await database_1.default.connect();
            const sql = `UPDATE users 
                  SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 
                  WHERE id=$6 
                  RETURNING id, email, user_name, first_name, last_name`;
            const result = await connection.query(sql, [
                u.email,
                u.user_name,
                u.first_name,
                u.last_name,
                hashPassword(u.password),
                u.id,
            ]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not update user: ${u.user_name}, ${error.message}`);
        }
    }
    // delete user
    async deleteOne(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = `DELETE FROM users 
                  WHERE id=($1) 
                  RETURNING id, email, user_name, first_name, last_name`;
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not delete user ${id}, ${error.message}`);
        }
    }
    // authenticate
    async authenticate(email, password) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT password FROM users WHERE email=$1';
            const result = await connection.query(sql, [email]);
            if (result.rows.length) {
                const { password: hashPassword } = result.rows[0];
                const isPasswordValid = bcrypt_1.default.compareSync(`${password}${process.env.pepper}`, hashPassword);
                if (isPasswordValid) {
                    const userInfo = await connection.query('SELECT id, email, user_name, first_name, last_name FROM users WHERE email=($1)', [email]);
                    return userInfo.rows[0];
                }
            }
            connection.release();
            return null;
        }
        catch (error) {
            throw new Error(`Unable to login: ${error.message}`);
        }
    }
}
exports.default = UserModel;
