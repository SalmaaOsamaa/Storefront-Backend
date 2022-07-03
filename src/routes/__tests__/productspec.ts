import supertest from "supertest";
import client from "../../database";
import UserModel from "../../models/user.model";
import {app} from "../../server";
import User from "../../types/user.type";

const req = supertest(app);
const userModel = new UserModel();
const token ="";
describe("Product Route API", () => {
  beforeAll(async () => {
    const user = {
        id:1,
        email: 'test2@test.com',
        user_name: 'test2User',
        first_name: 'Test',
        last_name: 'User',
        password: 'test123'
    } as User;

    await userModel.create(user);
  });

  afterAll(async () => {
    const connection = await client.connect();
    const sql =
      "DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1";
    const result = await connection.query(sql);
    connection.release();
  });

  describe("Test CRUD Operation for Product APIS ", () => {
    it("it should create new product", async () => {
      const res = await req
        .post("/api/products")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "testProduct",
          price: 31.9,
          category: "test",
        });
      expect(res.statusCode).toBe(200);
    });
    it("it should get all product", async () => {
      const res = await req
        .get("/api/products")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
    it("it should getByid product", async () => {
      const res = await req
        .get("/api/products/3")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
    });
    it("it should update product", async () => {
      const res = await req
        .patch("/api/products/3")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "new Prsoduct",
          price: 11,
          category: "electronics",
        });
      expect(res.statusCode).toBe(200);
    });

    it("it should delete product", async () => {
      const res = await req
        .delete("/api/products/1")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
  });
});