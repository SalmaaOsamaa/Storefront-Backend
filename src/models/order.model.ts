import client from "../database";
import OrderType from "../types/order.type";

export class Order{
    async create(order: OrderType): Promise<OrderType>{
        try{
            const {user_id, status} = order;
            const connection = await client.connect();
            const sql = "INSERT INTO orders (user_id, status) VALUES ($1,$2) RETURNING *";
            const result = await connection.query(sql,[user_id,status]);
            connection.release();
            return result.rows[0];

        } catch(err){
            throw new Error(`couldnot create order, ${err}`);
        }
    }
    async getCompletedOrders(): Promise<OrderType[]> {
        try{
            const connection = await client.connect();
            const sql: string = "SELECT * FROM orders WHERE status LIKE 'comp%'";
            const result = await connection.query(sql);
            connection.release();
            return result.rows;

        } catch(err){
            throw new Error(`could not get the orders, ${err}`);
        }
    }
    async getCurrentOrders(): Promise<OrderType[]> {
        try {
          const connection = await client.connect();
          const sql: string = "SELECT * FROM orders WHERE status LIKE 'curr%'";
          const result = await connection.query(sql);
          connection.release();
          console.log("ROWS:", result.rows);
          return result.rows;
        } catch (err) {
          throw new Error(`Couldn't get the orders, ${err}`);
        }
      }
      async show(id: number): Promise<OrderType[]> {
        try {
          const sql: string = "SELECT * FROM orders WHERE id=($1)";
          const connection = await client.connect();
          const result = await connection.query(sql, [id]);
          connection.release();
          return result.rows;
        } catch (err) {
          throw new Error(`Couldn't find orders for user: ${id}, ${err}`);
        }
      }
      async index(): Promise<OrderType[]> {
        try {
          const sql: string = "SELECT * FROM orders";
          const connection = await client.connect();
          const result = await connection.query(sql);
          connection.release();
          return result.rows;
        } catch (err) {
          throw new Error(`Couldn't find orders, ${err}`);
        }
      }
}