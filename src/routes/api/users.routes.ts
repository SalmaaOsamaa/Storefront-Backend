import { Router } from "express";
import * as controllers from "../../controllers/users.controllers";
import authenticationMiddlware from "../../middleware/authentication.middleware";
const userRoutes = Router();
// api/users
userRoutes
  .route("")
  .get(authenticationMiddlware, controllers.getMany)
  .post(controllers.create);

  //authenticate
  userRoutes.route('/authenticate').post(controllers.authenticate);
  userRoutes
  .route("/:id")
  .get(authenticationMiddlware, controllers.getOne)
  .patch(controllers.updateOne)
  .delete(controllers.deleteOne);
export default userRoutes;
