/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import UserModel from "../user.model";
import User from "../../types/user.type";
import client from "../../database";

const UserStore = new UserModel();

fdescribe("User Model", () => {
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
    const user = {
      id : 1,
      email: "test@test.com",
      user_name: "testUser",
      first_name: "Test",
      last_name: "User",
      password: "test123",
    } as User;
   
    it("Create method should return a New User", async () => {
      const createdUser = await UserStore.create({
        
        email: "test2@test.com",
        user_name: "test2User",
        first_name: "Test",
        last_name: "User",
        password: "test123",
      } as User);
      expect(createdUser).toEqual({
        id: 1,
        email: "test2@test.com",
        user_name: "test2User",
        first_name: "Test",
        last_name: "User",
      } as User);
    });
    it("Get Many method should return All available users in DB", async () => {
      const users = await UserStore.getMany();
      expect(users.length).toBe(2);
    });
    it("Get One method should return testUser when called with ID", async () => {
      // @ts-ignore

      const returnedUser = await UserStore.getOne(1);
      expect(returnedUser.email).toBe(user.email);
      expect(returnedUser.user_name).toBe(user.user_name);
      expect(returnedUser.first_name).toBe(user.first_name);
      expect(returnedUser.last_name).toBe(user.last_name);
    });
    it("Update One method should return a user with edited attributes", async () => {
      const updatedUser = await UserStore.updateOne({
        ...user,
        user_name: "testUser Updated",
        first_name: "salma",
        last_name: "osama",
      });
      expect(updatedUser.email).toBe(user.email);
      expect(updatedUser.user_name).toBe("testUser Updated");
      expect(updatedUser.first_name).toBe("salma");
      expect(updatedUser.last_name).toBe("osama");
    });
    it("Delete One method should delete user from DB", async () => {
      // @ts-ignore

      const deletedUser = await UserStore.deleteOne(user.id);
      expect(deletedUser.id).toBe(user.id);
    });
  });
});