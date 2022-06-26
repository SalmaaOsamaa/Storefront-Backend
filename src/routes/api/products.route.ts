import express from "express";
import * as controllers from "../../controllers/products.controllere";
import authenticationMiddlware from "../../middleware/authentication.middleware";

import {
  destroy,
  showByCategory,
} from "../../controllers/products.controllere";
export const productRouter = express.Router();

productRouter.get("", controllers.index);
productRouter.get("/:id", controllers.getOne);
productRouter.post("/", authenticationMiddlware , controllers.create);
productRouter.get("/category/:category", showByCategory);
productRouter.delete("/:id", destroy);
