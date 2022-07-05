import {app} from "../../server";
import supertest from "supertest";
import User from "../../types/user.type";
import client from "../../database";
import UserModel from "../../models/user.model";

const userModel = new UserModel();
const request = supertest(app);

describe("Users Endpoints", () => {
  let token = "";
  describe('user api endpoints',()=>{
    const user = {
        id:1,
        email: 'test2@test.com',
        user_name: 'test2User',
        first_name: 'Test',
        last_name: 'User',
        password: 'test123'
    } as User;
    beforeAll(async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const createdUser = await userModel.create(user)
      })
      afterAll(async () => {
        // clean db
        const connection = await client.connect()
        const sql = 'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;'
        await connection.query(sql)
        connection.release()
      })
      
  describe('Test Authenticate methods', () => {
    it('should be able to authenticate to get token', async () => {
      const res = await request
        .post('/api/users/authenticate')
        .set('Content-type', 'application/json')
        .send({
          email: 'test@test.com',
          password: 'test123',
        })
      expect(res.status).toBe(200)
      const { id, email, token: userToken } = res.body.data
      expect(id).toBe(user.id)
      expect(email).toBe('test@test.com')
      token = userToken
    });

  });
  describe("User Test CRUD Operations", () => {
    it("should create new user", async () => {
      const res = await request
        .post("/api/users")
        .set("Content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          first_name: "newU1ser1",
          last_name: "User121",
          password: "newUsertes1t@123",
          email: "newU1ser1test@gmail.com",
        });
      expect(res.statusCode).toBe(200);
      const { id, first_name, last_name, email } = res.body.data;
      expect(email).toBe("newU1ser1test@gmail.com");
      expect(first_name).toBe("newU1ser1");
      expect(last_name).toBe("User121");
    });
    it('should get list of users', async () => {
        const res = await request
          .get('/api/users/')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
        expect(res.body.data.length).toBe(2)
      })
      it('should get user info', async () => {
        const res = await request
          .get(`/api/users/${user.id}`)
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
        expect(res.body.data.user_name).toBe('testUser')
        expect(res.body.data.email).toBe('test@test.com')
      })
      it('should update user info', async () => {
        const res = await request
          .patch(`/api/users/${user.id}`)
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({
            ...user,
            user_name: 'salmaosama',
            first_name: 'salma',
            last_name: 'osama',
          })
        expect(res.status).toBe(200)
        const { id, email, user_name, first_name, last_name } = res.body.data
        expect(id).toBe(user.id)
        expect(email).toBe(user.email)
        expect(user_name).toBe('salmaosama')
        expect(first_name).toBe('salma')
        expect(last_name).toBe('osama')
      })
      it('should delete user', async () => {
        const res = await request
          .delete(`/api/users/${user.id}`)
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
        expect(res.body.data.id).toBe(user.id)
        expect(res.body.data.user_name).toBe('salmaosama')
      })
    })
  })
})
  

