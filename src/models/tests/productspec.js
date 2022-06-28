"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = require("../product.model");
const store = new product_model_1.ProductStore();
describe("Product Model", () => {
    it("should have a getProductsByCat method", () => {
        expect(store.getProductbyCat).toBeDefined();
    });
    it("create method should add a product", async () => {
        const result = await store.create({
            name: "banana",
            price: "8",
            category: "fruits",
        });
        expect(result).toEqual({
            id: 2,
            name: "banana",
            price: "8",
            category: "fruits",
        });
    });
    it("index method should return a list of products", async () => {
        const result = await store.index();
        expect(result[0]).toEqual({
            id: 2,
            name: "banana",
            price: "8",
            category: "fruits",
        });
    });
    it("show method should return specified product", async () => {
        const result = await store.getOne(2);
        expect(result).toEqual({
            id: 2,
            name: "banana",
            price: "8",
            category: "fruits",
        });
    });
    it("getProductsByCat method should return products by category", async () => {
        const result = await store.getProductbyCat("fruits");
        expect(result).toEqual([
            {
                id: 2,
                name: "banana",
                price: "8",
                category: "fruits",
            },
        ]);
    });
    it("getProductsByCat method should return no products with dummy category", async () => {
        const result = await store.getProductbyCat("dummy");
        expect(result).toEqual([]);
    });
    it("delete method should remove product", async () => {
        await store.deleteProduct(2);
        const result = await store.deleteProduct(2);
        expect(result).toBeUndefined;
    });
});
