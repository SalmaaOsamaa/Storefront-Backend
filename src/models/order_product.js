"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderProductStore {
    async addProduct(orderProd) {
        try {
            const connection = await database_1.default.connect();
            const sql = "INSERT INTO order_product (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
            const result = await connection.query(sql, [
                orderProd.quantity,
                orderProd.order_id,
                orderProd.product_id
            ]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`could not add product ${orderProd.product_id} to order ${orderProd.order_id}. Error: ${err}`);
        }
    }
    async deleteAll(order_id) {
        try {
            const connection = await database_1.default.connect();
            const sql = "DELETE FROM order_product WHERE order_id = ($1)";
            await connection.query(sql, [order_id]);
            connection.release();
        }
        catch (err) {
            throw new Error(`could not delete order details for order : ${order_id}. Error: ${err}`);
        }
    }
}
exports.OrderProductStore = OrderProductStore;
