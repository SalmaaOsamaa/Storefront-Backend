"use strict";
// import {Request, Response, NextFunction} from "express"
// import { product, productStore } from '../models/product.model';
// const productModel = new productStore(); 
// //CRUD 
// // GET ALL PRODUCTS 
// export const index = async(req: Request, res:Response)=>{
//     try{
//         const products: product[] = await productModel.index();
//         res.json(products);
//     } catch(err){
//         res.status(400).json(err);
//     }
// };
// //get product by id 
// export const show = async (req: Request, res: Response)=>{
//     try{
//         const productId: number = parseInt(req.params.id);
//     } catch(err){
//         res.status(400).json(err);
//     }
// };
// //create product 
// export const create = async (req:Request, res:Response)=>{
//     try{
//         const product: product[] ={
//             // @ts-ignore
//             name: req.body.name,
//             price: req.body.price,
//             category: req.body.category
//         } 
//     } catch (err){
//         res.status(400);
//         res.json(err)
//     }
// };
// // get product by category 
// export const showByCategory = async(req:Request, res:Response)=>{
//     try{
//         const category: string = String(req.params.category);
//         const productsbyCategory: product[] = await productModel.getProductsByCat(category);
//     } catch(err){
//         res.status(400);
//         res.json(err);
//     }
// } 
// // Delete product by ID 
// export const destroy = async(req:Request, res:Response)=>{
//     try {
//         const id: number = parseInt(req.params.id);
//         const deletedOrder = await productModel.delete(id);
//         return res.end(`deleted product: ${deletedOrder}`);
//     } catch(err){
//         res.status(400);
//         res.json(err);
//     }
// };
