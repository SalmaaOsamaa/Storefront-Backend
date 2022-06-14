import { Router, Request, Response} from "express";
import * as controllers from '../../controllers/users.controllers';
const routes = Router();

// api/users
routes.route('/').get(controllers.getMany).post(controllers.create);
routes.route('/:id').get(controllers.getOne).post(controllers.updateOne).delete(controllers.deleteOne);

export default routes;