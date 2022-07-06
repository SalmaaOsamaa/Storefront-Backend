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



describe("Order Model ", () => {
  
 
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
      email: "tetestingg@testing.com",
        user_name: "tesalmaosamaa",
        first_name: "tesalmaa",
        last_name: "teosamaa",
        password: "tetest123",
    } as User;
    const product = {
        name: "producttest",
        price: 66,
        category: "electronics",
    } as unknown as productType;
    const order = {
      status: "active",
      user_id: 1,
    } as OrderType;

    beforeAll(async () => {

      await userModel.create(user);
      await productModel.create(product);
    });
    afterAll(async function () {
      const connection = await client.connect();
      const sql =`DELETE FROM orders;
                  ALTER SEQUENCE orders_id_seq RESTART WITH 1;
                  DELETE FROM users;
                  ALTER SEQUENCE users_id_seq RESTART WITH 1;
                  DELETE FROM products;
                  ALTER SEQUENCE products_id_seq RESTART WITH 1;
                  `;
      await connection.query(sql);
      connection.release();
  });

   

    it("createOrder should Create Order", async () => {
      const newOrder = await orderModel.create(order);
      expect(newOrder.id).toBeGreaterThan(0);
    });

    it("getAllOrders should return all Orders", async () => {
      const allOrders = await orderModel.index();
      expect(allOrders.length).toBeGreaterThan(0);
    });

   

    it("getOrderByUserId should return Order related to specific order id ", async () => {
      const returnedOrder = await orderModel.show(1);
      expect(returnedOrder.id).toEqual(1);
    });

   

    it("completed ordere", async () => {
      const updateOrder = await orderModel.getCompletedOrders();
      expect(updateOrder).toEqual([]);
    });
    it("curremt ordere", async () => {
      const updateOrder = await orderModel.getCurrentOrders();
      expect(updateOrder).toEqual([]);
    });
    
  });
});