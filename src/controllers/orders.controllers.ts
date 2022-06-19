import express, {Request, Response} from 'express';
import OrderType from '../types/order.type';
import { Order } from '../models/order.model';

const orderStore = new Order();
//----CRUD functions-----//

//create order
export const create = async(req:Request, res:Response)=> {
    try{
        const order: OrderType = {
            user_id: req.body.user_id,
            status: req.body.status
        };
        const newOrder: OrderType = await orderStore.create(order);
        return res.json(newOrder);
    } catch(err){
        res.status(400);
        res.json(err);
    }
};
// get all completed orders
export const CompletedOrders = async(req:Request, res:Response) =>{
    try{
        const Orders: OrderType[] = await orderStore.getCompletedOrders();
        return res.json(Orders);
    } catch(err){
        res.status(400);
        res.json(err);
    }
};
export const CurrentOrders = async (req:Request, res:Response)=>{
    try{
        const Orders: OrderType[] = await orderStore.getCurrentOrders();
        return res.json(Orders);

    } catch(err){
        res.status(400);
        res.json(err);
    }

};
// Get orders by user id 
export const show = async (req:Request, res:Response)=>{
    try{
        const userId: number = parseInt(req.params.id);
        const Orders: OrderType[] = await orderStore.show(userId);
        return res.json(Orders);
    } catch(err){
        res.status(400);
        res.json(err);
    }
}
//get all orders 
export const index = async(req:Request, res:Response)=>{
    try{
        const Orders : OrderType[] = await orderStore.index();
        return res.json(Orders);
    } catch(err){
        res.status(400);
        res.json(err);
    }
}

