"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = exports.show = exports.CurrentOrders = exports.CompletedOrders = exports.create = void 0;
const order_model_1 = require("../models/order.model");
const orderStore = new order_model_1.Order();
//----CRUD functions-----//
//create order
const create = async (req, res) => {
    try {
        const order = {
            user_id: req.body.user_id,
            status: req.body.status,
        };
        const newOrder = await orderStore.create(order);
        return res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.create = create;
// get all completed orders
const CompletedOrders = async (req, res) => {
    try {
        const Orders = await orderStore.getCompletedOrders();
        return res.json(Orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.CompletedOrders = CompletedOrders;
const CurrentOrders = async (req, res) => {
    try {
        const Orders = await orderStore.getCurrentOrders();
        return res.json(Orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.CurrentOrders = CurrentOrders;
// Get orders by user id
const show = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const Orders = await orderStore.show(userId);
        return res.json(Orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.show = show;
//get all orders
const index = async (req, res) => {
    try {
        const Orders = await orderStore.index();
        return res.json(Orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.index = index;
