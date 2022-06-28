"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.app);
describe("Products Endpoints", () => {
    // to use them globally
    let token = "";
    const productExample = {
        name: "orange",
        price: "4",
        category: "fruits",
    };
    // @ts-ignore
    const userExample = {
        first_name: "salma",
        last_name: "osama",
        password: "test123",
    };
    // creating user to get JWT for Authorization
    beforeAll(async () => {
        const newUser = await request.post("/users").send(userExample);
        token = newUser.body;
    });
    afterAll(async () => {
        await request.delete("/users/2");
    });
    it("Should Create a product ", async () => {
        const newProduct = await request
            .post("/products")
            .send(productExample)
            .set("Authorization", `Bearer ${token}`);
        console.log(newProduct.body);
        expect(newProduct.status).toBe(200);
        expect(newProduct.body).toEqual({
            id: 1,
            ...productExample,
        });
    });
    it("Should Get all products ", async () => {
        const products = await request.get("/products");
        expect(products.status).toBe(200);
        expect(products.body.length).toBeGreaterThan(0);
    });
    it("Should Get product by id ", async () => {
        const order = await request.get("/products/1");
        expect(order.status).toBe(200);
        expect(order.body).toEqual({
            id: 1,
            ...productExample,
        });
    });
    it("Should Get all products with category (fruits)", async () => {
        const products = await request.get("/products/category/fruits");
        expect(products.status).toBe(200);
        expect(products.body).toEqual([
            {
                id: 1,
                ...productExample,
            },
        ]);
    });
    it("Should delete product with id", async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const deletedOrder = await request.delete("/products/1");
        const products = await request.get("/products");
        expect(products.status).toBe(200);
        expect(products.body).toEqual([]);
    });
});
