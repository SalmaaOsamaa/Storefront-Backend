"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'something wrong';
    res.status(status).json({ status, message });
    next();
};
exports.default = errorMiddleware;
