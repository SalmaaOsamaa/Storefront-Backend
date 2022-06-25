import express from 'express';
import authenticationMiddlware from "../../middleware/authentication.middleware";
import * as controllers from '../../controllers/order_product.controllers';
export const orderProductRoutes = express.Router();

orderProductRoutes.route('/:id/products').post(authenticationMiddlware, controllers.addProduct);

