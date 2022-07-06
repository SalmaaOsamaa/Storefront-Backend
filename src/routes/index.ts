import { Router } from "express";
import userRoutes from "./api/users.routes";
import { productRouter } from "./api/products.route";
import { orderRoutes } from "./api/orders.routes";
import { orderProductRoutes } from "./api/order_product.routes";
const routes = Router();
routes.use("/users", userRoutes);
routes.use("/products", productRouter);
routes.use("/orders", orderRoutes);
routes.use("/orderproduct",orderProductRoutes)


export default routes;
