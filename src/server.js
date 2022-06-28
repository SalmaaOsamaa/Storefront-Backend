"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// import { productRouter } from './routes/api/products'
const routes_1 = __importDefault(require("./routes"));
const database_1 = __importDefault(require("./database"));
const dotenv_1 = __importDefault(require("dotenv"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const { PORT } = process.env;
exports.app = (0, express_1.default)();
dotenv_1.default.config();
exports.app.use((0, morgan_1.default)('common'));
exports.app.use(body_parser_1.default.json());
exports.app.use(error_middleware_1.default);
const corsOptions = {
    origin: "http://example.com",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
exports.app.use((0, cors_1.default)(corsOptions));
//   app.use(productRouter);
exports.app.get("/", function (req, res) {
    res.send("Hello World!");
});
//test db
database_1.default.connect().then(client => {
    return client.query('SELECT NOW()').then((res) => {
        client.release();
        console.log(res.rows);
    })
        .catch((err) => {
        client.release();
        console.log(err.stack);
    });
});
exports.app.use("/api", routes_1.default);
exports.app.listen(3000, () => {
    console.log(`starting app on: ${PORT}`);
});
