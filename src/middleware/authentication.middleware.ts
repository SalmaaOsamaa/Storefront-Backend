import { Request,Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';


const handleUnauthorizedError(next:NextFunction)=>{
    const error: Error = new Error('Login Error : please try again');
        error.status = 401;
        next(error);
}

const validateTokenMiddleware = (
    req:Request,
    res:Response,
    next
) => {
    try{
        // get authheader 
        //check authHeader validate
        // get value  of token
        // check if it bearer
        //verify token
        //token type not bearer
        //no token provider
    } catch(error){
        handleUnauthorizedError(next);

    }
}