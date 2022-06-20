import { Request, Response } from "express";
import productType from "../types/product.type";
import { ProductStore } from "../models/product.model";

const store = new ProductStore();
//CRUD
// GET ALL PRODUCTS
export const index = async (req: Request, res: Response) => {
  try {
    const products: productType[] = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400).json(err);
  }
};

//get product by id

export const getOne = async (req: Request, res: Response) => {
  try {
    const productId: number = parseInt(req.params.id);
    const product: productType = await store.getOne(productId);
    res.json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};
//create product
export const create = async (req: Request, res: Response) => {
  try {
    const product: productType = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const newProduct: productType = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
// get product by category
export const showByCategory = async (req: Request, res: Response) => {
  try {
    const category = String(req.params.category);
    const productsbyCat: productType[] = await store.getProductbyCat(category);
    res.json(productsbyCat);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
// Delete product by ID

export const destroy = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const deletedOrder = await store.deleteProduct(id);
    return res.end(`deleted product: ${deletedOrder}`);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
