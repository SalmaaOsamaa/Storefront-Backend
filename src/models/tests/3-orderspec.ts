import { Order } from "../order.model";
import OrderType from "../../types/order.type";
import User from "../../types/user.type";
import productType from "../../types/product.type";
import client from "../../database";
import UserModel from "../user.model";
import { ProductStore } from "../product.model";
const orderModel = new Order()
const userModel = new UserModel();
const productModel = new ProductStore();



describe("Order Model Dfined", () => {
  describe("Test Order Model Methods have defined", () => {
    it("Order createOrder has defined", () => {
      expect(orderModel.create).toBeDefined();
    });
    it("Order getAllOrders has defined", () => {
      expect(orderModel.index).toBeDefined();
    });
    it("Order get current order has defined", () => {
      expect(orderModel.getCurrentOrders).toBeDefined();
    });
    it("Order get completed has defined", () => {
      expect(orderModel.getCompletedOrders).toBeDefined();
    });
    it("Order get order by id has defined", () => {
      expect(orderModel.show).toBeDefined();
    });
  });

  describe("Order Model logic", () => {
    const user = {
      id: 1,
      first_name: "Test",
      last_name: "User",
      email: "test@test.com",
      password: "test123",
    } as User;
    const product = {
        name: "product  test",
        price: 66,
        category: "electronics",
    } as unknown as productType;
    const order = {
      id: 1,
      status: "active",
      user_id: 1,
    } as OrderType;

    beforeAll(async () => {
      await userModel.create(user);
      await productModel.create(product);
    });

    afterAll(async () => {
      const connection = await client.connect();
      const sql =
        "DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;";
      await connection.query(sql);
      connection.release();
    });

    it("createOrder should Create Order", async () => {
      const newOrder = await orderModel.create(order);
      expect(newOrder).toEqual({
        id:1,
        ...order
      })
    });

    it("getAllOrders should return all Orders", async () => {
      const allOrders = await orderModel.index();
      expect(allOrders.length).toBeGreaterThanOrEqual(1);
    });

   

    it("getOrderByUserId should return Order related to specific order id ", async () => {
      const returnedOrder = await orderModel.show(1);
      expect(returnedOrder).toEqual([
        {
            id:1,
            ...order,

        }
      ]);
    });

   

    it("completed ordere", async () => {
      const updateOrder = await orderModel.getCompletedOrders();
      expect(updateOrder).toEqual([]);
    });
    
  });
});