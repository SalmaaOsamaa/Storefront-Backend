import express from "express";
import * as controllers from "../../controllers/products.controllere";
import {
  destroy,
  showByCategory,
} from "../../controllers/products.controllere";
export const productRouter = express.Router();

productRouter.get("/products", controllers.index);
productRouter.get("/products/:id", controllers.getOne);
productRouter.post("/products", controllers.create);
productRouter.get("/products/category/:category", showByCategory);
productRouter.delete("/products/:id", destroy);
