import client from "../database";
import OrderProductType from "../types/order_product.type";
 
export class OrderProductStore {
    async addProduct(orderProd: OrderProductType): Promise<OrderProductType>{
        try{
            const connection = await client.connect();
            const sql ="INSERT INTO order_product (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
            const result = await connection.query(sql, [
                orderProd.quantity,
                orderProd.order_id,
                orderProd.product_id
            ]);
            connection.release();
            return result.rows[0];
        } catch(err){
            throw new Error (`could not add product ${orderProd.product_id} to order ${orderProd.order_id}. Error: ${err}`);


        }

    }

    async deleteAll(order_id: number): Promise<void> {
        try{
            const connection = await client.connect();
            const sql = "DELETE FROM order_product WHERE order_id = ($1)";
            await connection.query(sql, [order_id]);
            connection.release();

        } catch(err){
throw new Error(`could not delete order details for order : ${order_id}. Error: ${err}`);
        }
    }
}