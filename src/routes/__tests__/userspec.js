"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.app);
describe("Users Endpoints", () => {
    let token = "";
    // @ts-ignore
    const userExample = {
        first_name: "salma",
        last_name: "osama",
        password: "test123",
    };
    it("Should Create user & get token", async () => {
        const newUser = await request.post("/users").send(userExample);
        // get JWT for Authorization
        token = newUser.body;
        expect(newUser.status).toBe(200);
        expect(token.length).toBeGreaterThan(10);
    });
    it("Should Get all Users ", async () => {
        const users = await request
            .get("/users")
            .set(`Authorization`, "Bearer " + token);
        expect(users.status).toBe(200);
        expect(users.body.length).toBeGreaterThan(0);
    });
    it("Should Get user by user id ", async () => {
        const user = await request
            .get("/users/3")
            .set(`Authorization`, "Bearer " + token);
        expect(user.status).toBe(200);
        expect(user.body.id).toEqual(3);
        expect(user.body.first_name).toEqual("salma");
        expect(user.body.last_name).toEqual("osama");
        expect(user.body.password).toBeDefined();
    });
    it("Should delete user by id", async () => {
        const del = await request.delete("/users/3");
        const deletedUser = await request
            .get("/users/3")
            .set(`Authorization`, "Bearer " + token);
        expect(del.status).toBe(200);
        expect(deletedUser.body).toBeUndefined;
    });
});
