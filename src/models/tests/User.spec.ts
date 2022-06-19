import UserModel from '../user.model';
import client from "../../database";
import User from "../../types/user.type";

const userModel = new UserModel();
describe('User Model',()=>{
 describe('Test methods exists',()=>{
    it('should have a get many users method ',()=>{
        expect(userModel.getMany).toBeDefined();

    });
    it('should have a get one user method',()=>{
        expect(userModel.getOne).toBeDefined();
    });
    it('should have a create user method'),()=>{
        expect(userModel.create).toBeDefined();
    }
 });
 it('should have an update user meethod'),()=>{
    expect(userModel.updateOne).toBeDefined();
 }
});
