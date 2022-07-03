/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProductStore } from "../product.model";
import productType from "../../types/product.type";
import client from "../../database";

const productModel = new ProductStore();

describe('product model',()=>{
  describe('Test product model methods have defined',()=>{
    it('should have a create product has defined',()=>{
      expect(productModel.create).toBeDefined();
    });
    it('product get one product',()=>{
      expect(productModel.getOne).toBeDefined();
    });
    it('should have get product by cat',()=>{
      expect(productModel.getProductbyCat).toBeDefined();
    });
    it('should get all product method',()=>{
      expect(productModel.index).toBeDefined();
    });
    it('should delete product method',()=>{
      expect(productModel.deleteProduct).toBeDefined();
    });
  });
  describe('test product method functionality ',()=>{
    const product = {
      id: 1,
      name: "product test",
      price: 66,
      category: "electronics"
    } as unknown as productType;
    beforeAll(async () => {
      const createdProduct= await productModel.create(product)
    })
    afterAll(async () => {
      const connection = await client.connect()
      const sql = 'DELETE FROM products;'
      await connection.query(sql)
      connection.release()
    })
    it("create product", async()=>{
      const newProduct = await productModel.create(product);
      expect(newProduct.category).toBe("electronics");
      expect(newProduct.name).toBe("product test");
    });
    it("get  all products",async()=>{
      const allProducts = await productModel.index();
      expect(allProducts.length).toBe(1);
    });
    it("get product by id", async()=>{
      const getProductByID = await productModel.getOne(1);
      expect(getProductByID.id).toBe(1);
      expect(getProductByID.name).toBe("product test");
      expect(getProductByID.category).toBe("electronics");
    }); 
    it('Delete One method should delete user from DB', async () => {
        // @ts-ignore

      const deletedProduct = await productModel.deleteProduct(product.id)
      expect(deletedProduct.id).toBe(product.id)
    })
  })
})