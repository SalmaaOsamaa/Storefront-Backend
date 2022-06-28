"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sql = "SELECT * FROM products";
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`counld not get products, ${err}`);
        }
    }
    async getOne(id) {
        try {
            const sql = "SELECT * FROM products WHERE id=($1)";
            const connection = await database_1.default.connect();
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`couldnot find product ${id}, ${err}`);
        }
    }
    async create(prod) {
        try {
            const { name, price, category } = prod;
            const sql = "INSERT INTO products (name,price,category) VALUES($1,$2,$3) RETURNING *";
            const connection = await database_1.default.connect();
            const result = await connection.query(sql, [name, price, category]);
            const product = result.rows[0];
            connection.release();
            return product;
        }
        catch (err) {
            throw new Error(`could not add new product ${prod.name}, ${err}`);
        }
    }
    async getProductbyCat(category) {
        try {
            const connection = await database_1.default.connect();
            const sql = "SELECT * FROM products WHERE category = $1";
            const result = await connection.query(sql, [category]);
            connection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`could not get product by category ${category}, ${err}`);
        }
    }
    async deleteProduct(id) {
        try {
            const sql = "DELETE FROM products WHERE id= $1 RETURNING *";
            const connection = await database_1.default.connect();
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`could not delete ${id}, ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
