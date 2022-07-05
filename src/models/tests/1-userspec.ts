import UserModel from '../user.model'
import db from '../../database'
import User from '../../types/user.type'

const userModel = new UserModel()

describe('User Model', () => {
  describe('Test methods exists', () => {
    it('should have an Get Many Users method', () => {
      expect(userModel.getMany).toBeDefined()
    })

    it('should have a Get One User method', () => {
      expect(userModel.getOne).toBeDefined()
    })

    it('should have a Create User method', () => {
      expect(userModel.create).toBeDefined()
    })

    it('should have a Update User method', () => {
      expect(userModel.updateOne).toBeDefined()
    })

    it('should have a Delete User method', () => {
      expect(userModel.deleteOne).toBeDefined()
    })

    it('should have an Authenticate User method', () => {
      expect(userModel.authenticate).toBeDefined()
    })
  })

  describe('Test User Model Logic', () => {
    const user = {
      email: 'test@test.com',
      user_name: 'testUser',
      first_name: 'Test',
      last_name: 'User',
      password: 'test123',
    } as User

    beforeAll(async () => {
      const createdUser = await userModel.create(user)
      user.id = createdUser.id
    })

    afterAll(async () => {
      const connection = await db.connect()
      const sql = 'DELETE FROM users \n ALTER SEQUENCE users_id_seq RESTART WITH 1;'
      await connection.query(sql)
      connection.release()
    })

    it('Create method should return a New User', async () => {
      const createdUser = await userModel.create({
        email: 'test2@test.com',
        user_name: 'test2User',
        first_name: 'Test',
        last_name: 'User',
        password: 'test123',
      } as User)
      expect(createdUser).toEqual({
        id: createdUser.id,
        email: 'test2@test.com',
        user_name: 'test2User',
        first_name: 'Test',
        last_name: 'User',
      } as User)
    })

    it('Get Many method should return All available users in DB', async () => {
      const users = await userModel.getMany()
      expect(users.length).toBe(2)
    })

    it('Get One method should return testUser when called with ID', async () => {
            // @ts-ignore

      const returnedUser = await userModel.getOne(user.id as string)
      expect(returnedUser.id).toBe(user.id)
      expect(returnedUser.email).toBe(user.email)
      expect(returnedUser.user_name).toBe(user.user_name)
      expect(returnedUser.first_name).toBe(user.first_name)
      expect(returnedUser.last_name).toBe(user.last_name)
    })

    it('Update One method should return a user with edited attributes', async () => {
      const updatedUser = await userModel.updateOne({
        ...user,
        user_name: 'testUser Updated',
        first_name: 'salma',
        last_name: 'osama',
      })
      expect(updatedUser.id).toBe(user.id)
      expect(updatedUser.email).toBe(user.email)
      expect(updatedUser.user_name).toBe('testUser Updated')
      expect(updatedUser.first_name).toBe('salma')
      expect(updatedUser.last_name).toBe('osama')
    })

    it('Delete One method should delete user from DB', async () => {
            // @ts-ignore

      const deletedUser = await userModel.deleteOne(user.id as string)
      expect(deletedUser.id).toBe(user.id)
    })
  })
})