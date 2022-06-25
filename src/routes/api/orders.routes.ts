import express from "express";
import authenticationMiddlware from "../../middleware/authentication.middleware";
import * as controllers from "../../controllers/orders.controllers";
export const orderRoutes = express.Router();

orderRoutes.route("").post(authenticationMiddlware, controllers.create);
orderRoutes
  .route("/current")
  .get(authenticationMiddlware, controllers.CurrentOrders);
orderRoutes
  .route("/completed")
  .get(authenticationMiddlware, controllers.CompletedOrders);
orderRoutes.route("/:id").get(authenticationMiddlware, controllers.show);
orderRoutes.route("").get(authenticationMiddlware, controllers.index);
