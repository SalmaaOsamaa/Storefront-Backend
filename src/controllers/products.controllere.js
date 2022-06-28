"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.showByCategory = exports.create = exports.getOne = exports.index = void 0;
const product_model_1 = require("../models/product.model");
const store = new product_model_1.ProductStore();
//CRUD
// GET ALL PRODUCTS
const index = async (req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
exports.index = index;
//get product by id
const getOne = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await store.getOne(productId);
        res.json(product);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
exports.getOne = getOne;
//create product
const create = async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.create = create;
// get product by category
const showByCategory = async (req, res) => {
    try {
        const category = String(req.params.category);
        const productsbyCat = await store.getProductbyCat(category);
        res.json(productsbyCat);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.showByCategory = showByCategory;
// Delete product by ID
const destroy = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedOrder = await store.deleteProduct(id);
        return res.end(`deleted product: ${deletedOrder}`);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.destroy = destroy;
