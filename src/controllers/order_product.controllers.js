"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = void 0;
const order_product_1 = require("../models/order_product");
const store = new order_product_1.OrderProductStore();
const addProduct = async (req, res) => {
    const order_id = parseInt(req.params.id);
    const product_id = parseInt(req.body.product_id);
    const quantity = parseInt(req.body.quantity);
    const orderProduct = { quantity, order_id, product_id };
    try {
        const newOrderProduct = await store.addProduct(orderProduct);
        res.json(newOrderProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.addProduct = addProduct;
