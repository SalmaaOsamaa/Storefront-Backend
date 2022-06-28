"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const database_1 = __importDefault(require("../database"));
class Order {
    async create(order) {
        try {
            const { user_id, status } = order;
            const connection = await database_1.default.connect();
            const sql = "INSERT INTO orders (user_id, status) VALUES ($1,$2) RETURNING *";
            const result = await connection.query(sql, [user_id, status]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`couldnot create order, ${err}`);
        }
    }
    async getCompletedOrders() {
        try {
            const connection = await database_1.default.connect();
            const sql = "SELECT * FROM orders WHERE status LIKE 'comp%'";
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`could not get the orders, ${err}`);
        }
    }
    async getCurrentOrders() {
        try {
            const connection = await database_1.default.connect();
            const sql = "SELECT * FROM orders WHERE status LIKE 'curr%'";
            const result = await connection.query(sql);
            connection.release();
            console.log("ROWS:", result.rows);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Couldn't get the orders, ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = "SELECT * FROM orders WHERE id=($1)";
            const connection = await database_1.default.connect();
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Couldn't find orders for user: ${id}, ${err}`);
        }
    }
    async index() {
        try {
            const sql = "SELECT * FROM orders";
            const connection = await database_1.default.connect();
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Couldn't find orders, ${err}`);
        }
    }
}
exports.Order = Order;
