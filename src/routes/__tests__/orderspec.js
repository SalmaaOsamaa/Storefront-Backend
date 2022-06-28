"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.app);
describe("Orders Endpoints", () => {
    // to use them globally
    let token = "";
    const orderExample = {
        user_id: 1,
        status: "completed",
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
        await request.delete("/users/1");
    });
    it("Should Create order ", async () => {
        const newOrder = await request
            .post("/orders")
            .send(orderExample)
            .set("Authorization", `Bearer ${token}`);
        expect(newOrder.status).toBe(200);
        expect(newOrder.body).toEqual({
            id: 1,
            ...orderExample,
        });
    });
    it("Should Get all orders ", async () => {
        const orders = await request
            .get("/orders")
            .set(`Authorization`, "Bearer " + token);
        expect(orders.status).toBe(200);
        expect(orders.body.length).toBeGreaterThan(0);
    });
    it("Should Get orders by user id ", async () => {
        const orders = await request
            .get("/orders/1")
            .set(`Authorization`, "Bearer " + token);
        expect(orders.status).toBe(200);
        expect(orders.body).toEqual([
            {
                id: 1,
                ...orderExample,
            },
        ]);
    });
    it("Should Get empty list of Current orders using current", async () => {
        const orders = await request
            .get("/orders/current")
            .set(`Authorization`, "Bearer " + token);
        expect(orders.status).toBe(200);
        expect(orders.body).toEqual([]);
    });
    it("Should Get all Completed orders ", async () => {
        const orders = await request
            .get("/orders/completed")
            .set(`Authorization`, "Bearer " + token);
        expect(orders.status).toBe(200);
        expect(orders.body).toEqual([
            {
                id: 1,
                ...orderExample,
            },
        ]);
    });
});
