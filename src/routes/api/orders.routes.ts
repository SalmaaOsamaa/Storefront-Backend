import express from "express";
import authenticationMiddlware from "../../middleware/authentication.middleware";
import * as controllers from "../../controllers/orders.controllers";
export const orderRoutes = express.Router();

orderRoutes.route("/orders").post(authenticationMiddlware, controllers.create);
orderRoutes
  .route("/orders/current")
  .get(authenticationMiddlware, controllers.CurrentOrders);
orderRoutes
  .route("/orders/completed")
  .get(authenticationMiddlware, controllers.CompletedOrders);
orderRoutes.route("/orders/:id").get(authenticationMiddlware, controllers.show);
orderRoutes.route("/orders").get(authenticationMiddlware, controllers.index);
