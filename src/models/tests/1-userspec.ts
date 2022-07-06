import UserModel from "../user.model";
import client from "../../database";

const UserStore = new UserModel();

describe("User Model", () => {
afterAll(async function () {
    const connection = await client.connect();
    const sql = 'DELETE FROM users;';
    await connection.query(sql);
    const reset = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await connection.query(reset);
    connection.release();

    //anything in here will apply to everything in each nested describe
});

  describe("Test methods exists", () => {
    it("should have a get many user method", () => {
      expect(UserStore.getMany).toBeDefined();
    });
    it("should have ea get one user method", () => {
      expect(UserStore.getOne).toBeDefined();
    });

    it("should have a create user method", () => {
      expect(UserStore.create).toBeDefined();
    });
    it("should have an update method", () => {
      expect(UserStore.updateOne).toBeDefined();
    });
    it("should have a delete user emthod", () => {
      expect(UserStore.deleteOne).toBeDefined();
    });
    it("should have an authenticate user  method", () => {
      expect(UserStore.authenticate).toBeDefined();
    });
  });
  describe("test user model ", () => {
    describe('create function',()=>{
      it('create user', async()=>{
        const createdUser = await UserStore.create({
        email: "testingg@testing.com",
        user_name: "salmaosamaa",
        first_name: "salmaa",
        last_name: "osamaa",
        password: "test123",
        });
        expect(createdUser.id).toEqual(1);
        expect(createdUser. email).toEqual('testingg@testing.com');
        expect(createdUser.user_name).toEqual('salmaosamaa');
        expect(createdUser.first_name).toEqual('salmaa');
        expect(createdUser.last_name).toEqual('osamaa');
        expect(createdUser.password).toBeTruthy;
      });
      it('get one user by id', async()=>{
        const result = await UserStore.getOne('1');
        expect(result.id).toEqual(1);
        expect(result.user_name).toEqual("salmaosamaa");
        expect(result.first_name).toEqual('salmaa');
        expect(result.last_name).toEqual('osamaa');
        expect(result.password).toBeTruthy;
      });
      it('get many should return all users', async()=>{
        const users = await UserStore.getMany();
        expect(users.length).toBe(1);
        });
        it('return authenticated user', async()=>{
          const users = await UserStore.authenticate("testingg@testing.com", "test123");
          expect(users?.id).toEqual(1);
          expect(users?.email).toEqual('testingg@testing.com');
          expect(users?.user_name).toEqual('salmaosamaa');
          expect(users?.first_name).toEqual('salmaa');
          expect(users?.last_name).toEqual('osamaa');
          expect(users?.password).toBeTruthy;
          })
      it('return updated user', async()=>{
       
        const users = await UserStore.updateOne({
  
          email: 'test@test.com',
          user_name: 'test2User',
          first_name: 'Test',
          last_name: 'User',
          password: 'test123',
          id:1
      })
        expect(users.first_name).toEqual("Test");
       
        
       
        });
        it('return deleted user', async()=>{
       
          const users = await UserStore.deleteOne("1")
          
          
           expect(users.id).toEqual(1);
         
          
         
          })
    });
 

 
   

  


  });

  
})

  
