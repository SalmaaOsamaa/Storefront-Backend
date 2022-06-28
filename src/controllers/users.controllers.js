"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.deleteOne = exports.updateOne = exports.getOne = exports.getMany = exports.create = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel = new user_model_1.default();
const create = async (req, res, next) => {
    try {
        const user = await userModel.create(req.body);
        res.json({
            status: "success",
            data: { ...user },
            message: "User Created Successfully",
        });
    }
    catch (err) {
        next(err);
    }
};
exports.create = create;
const getMany = async (req, res, next) => {
    try {
        const user = await userModel.getMany();
        res.json({
            status: "success",
            message: "Done",
            data: [user],
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getMany = getMany;
const getOne = async (req, res, next) => {
    try {
        const user = await userModel.getOne(req.params.id);
        res.json({
            status: "sucess",
            message: "done",
            data: user,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getOne = getOne;
const updateOne = async (req, res, next) => {
    try {
        const user = await userModel.updateOne(req.body);
        res.json({
            status: "sucess",
            message: "done",
            data: user,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateOne = updateOne;
const deleteOne = async (req, res, next) => {
    try {
        const user = await userModel.deleteOne(req.params.id);
        res.json({
            status: "sucess",
            message: "done",
            data: user,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteOne = deleteOne;
// authenticate
const authenticate = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.authenticate(email, password);
        const token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET);
        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "the user name and password do not match please try again",
            });
        }
        return res.json({
            status: "success",
            data: { ...user, token },
            message: "user authenticated successfully",
        });
    }
    catch (err) {
        return next(err);
    }
};
exports.authenticate = authenticate;
