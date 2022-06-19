"use strict";
// // @ts-ignore
// import client from '../database';
// export type product = {
//     id: number;
//     name: string;
//     price: string;
//     category: string;
// };
// export class productStore {
//     async index() : Promise<product[]>{
//         try {
//             // @ts-ignore
//             const conn = await client.connect()
//             const sql = 'SELECT * FROM products'
//             const result = await conn.query(sql);
//             conn.release()
//             return result.rows
//         }
//         catch(err){
//             throw new Error (`couldnot get books. Error: ${err}`)
//         }
//     }
//     async show(id: string): Promise<product>{
//         try{
//             const sql = 'SELECT * FROM products WHERE id=($1)'
//             // @ts-ignore
//             const conn = await client.connect()
//             const result = await conn.query(sql,[id]);
//             conn.release();
//             return result.rows[0];
//         } catch(err){
//             throw new Error(`could not find product ${id}. Error: ${err}`)
//         }
//     }
//     async create(p:product): Promise<product>{
//         try{
//             const sql = 'INSERT INTO products (name,price,category) VALUES ($1,$2,$3) RETURNING *';
//             // @ts-ignore
//             const conn = await client.connect();
//             const result = await conn.query(sql, [p.name,p.price,p.category]);
//             const product = result.rows[0];
//             conn.release();
//             return product
//         } catch(err) {
//             throw new Error (`could not add new product ${name}. Error: ${err}`)
//         }
//     }
//     async getProductsByCat(category: string): Promise<product[]> {
//         try {
//           const sql: string = `SELECT * FROM products WHERE category=$1`;
//           const conn = await client.connect();
//           const result = await conn.query(sql, [category]);
//           conn.release();
//           return result.rows;
//         } catch (err) {
//           throw new Error(`Couldn't get product by category ${category}, ${err}`);
//         }
//       }
//     async delete(id:string): Promise<product>{
//         try{
//             const sql = 'DELETE FROM products WHERE id=($1)'
//             // @ts-ignore
//             const conn = await client.connect()
//             const result = await conn.query(sql,[id])
//             const product = result.rows[0]
//             conn.release()
//             return product 
//         } catch(err) {
//             throw new Error (`could not delete bood ${id} Eroor: ${err}`)
//         } 
//     }
// } 
