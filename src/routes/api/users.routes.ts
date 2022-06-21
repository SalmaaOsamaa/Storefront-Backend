import { Router } from "express";
import * as controllers from "../../controllers/users.controllers";
import authenticationMiddlware from "../../middleware/authentication.middleware";
const routes = Router();

// api/users
routes
  .route("/users")
  .get(authenticationMiddlware, controllers.getMany)
  .post(controllers.create);
routes
  .route("/users/:id")
  .get(authenticationMiddlware, controllers.getOne)
  .post(controllers.updateOne)
  .delete(controllers.deleteOne);

export default routes;
