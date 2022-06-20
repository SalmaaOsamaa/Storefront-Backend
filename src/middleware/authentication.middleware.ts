import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const validateTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get authheader
    const authHeader: string | undefined = req.get("Authorization");
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.TOKEN_SECRET as string);
      next();
    } else {
      throw new Error("auth header is not available ");
    }

    //check authHeader validate
    // get value  of token
    // check if it bearer
    //verify token
    //token type not bearer
    //no token provider
  } catch (error) {
    res.status(401).json(error);
  }
};

export default validateTokenMiddleware;
