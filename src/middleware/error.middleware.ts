import {Request, Response, NextFunction} from 'express';
import Error from '../interfaces/Error';
const errorMiddleware = (err: Error,
     req: Request,
      res:Response,
     next:NextFunction)=>{
        const status = err.status || 501;
        const message = err.message || 'something wrong'
        res.status(status).json({status, message});
        next();
     }

     export default errorMiddleware;