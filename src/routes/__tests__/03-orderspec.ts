import {app} from "../../server";
import supertest from "supertest";
import OrderType from "../../types/order.type";
import User from "../../types/user.type";

const request = supertest(app);

describe("Orders Endpoints", () => {
  // to use them globally
  let token = "";

  const orderExample: OrderType = {
    user_id: 1,
    status: "completed",
  };
      // @ts-ignore

  const userExample: User = {
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