"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateTokenMiddleware = (req, res, next) => {
    try {
        // get authheader 
        const authHeader = req.get('Authorization');
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
            next();
        }
        else {
            throw new Error("auth header is not available ");
        }
        //check authHeader validate
        // get value  of token
        // check if it bearer
        //verify token
        //token type not bearer
        //no token provider
    }
    catch (error) {
        res.status(401).json(error);
    }
};
exports.default = validateTokenMiddleware;
