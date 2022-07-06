import { ProductStore } from "../product.model";
import client from "../../database";

const productModel = new ProductStore();

describe("product Model", () => {
afterAll(async function () {
    const connection = await client.connect();
    const sql = 'DELETE FROM products;';
    await connection.query(sql);
    const reset = 'ALTER SEQUENCE products_id_seq RESTART WITH 1;';
    await connection.query(reset);
    connection.release();

    //anything in here will apply to everything in each nested describe
});

  describe("Test methods exists", () => {
    it("should have a get many product method", () => {
      expect(productModel.index).toBeDefined();
    });
    it("should have ea get one product method", () => {
      expect(productModel.getOne).toBeDefined();
    });

    it("should have a create product method", () => {
      expect(productModel.create).toBeDefined();
    });
    it("should have an getbycat method", () => {
      expect(productModel.getProductbyCat).toBeDefined();
    });
   
   
  });
  describe("test product model ", () => {
    describe('create function',()=>{
      it('create product', async()=>{
        const createdProduct = await productModel.create({
        name:"producttest",
        price:60,
        category:"testingproduct"
        });
        expect(createdProduct.id).toEqual(1);
        expect(createdProduct.name).toEqual('producttest');
        expect(createdProduct.price).toEqual(60);
        expect(createdProduct.category).toEqual('testingproduct');
        
      });
    });
    describe('get product by id',()=>{
      it('get one product by id', async()=>{
        const result = await productModel.getOne(1);
        expect(result.id).toEqual(1);
        expect(result.name).toEqual("producttest");
        expect(result.price).toEqual(60);
        expect(result.category).toEqual('testingproduct');

      })
    });
    describe('get many method', ()=>{
      it('get many should return all products', async()=>{
      const products = await productModel.index();
      expect(products.length).toBe(1);
      })
    });
    describe('get by category', ()=>{
      it('get product by category', async()=>{
      const products = await productModel.getProductbyCat("testingproduct");
      expect(products.length).toEqual(1);
      
      });
      it('delte product by id', async()=>{
        const products = await productModel.deleteProduct(1);
        expect(products.id).toEqual(1);
        
        })
    });
   


  });

  
})

  
