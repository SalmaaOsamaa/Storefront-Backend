import UserModel from "../user.model";
const UserStore = new UserModel();

describe("User Model", () => {
  afterAll(async () => {
    await UserStore.deleteProduct(4);
  });

  it("should have a show method", () => {
    expect(UserStore.getMany).toBeDefined();
  });

  it("create method should add user", async () => {
    // @ts-ignore
    const result = await UserStore.create({
        first_name: "salma",
        last_name: "osama",
        password: "test123",
       
    });
    expect(result.id).toEqual(4);
    expect(result.first_name).toEqual("salma");
    expect(result.last_name).toEqual("osama");
    expect(result.password).toBeDefined();
  });

  it("show method should return the specified user", async () => {
        // @ts-ignore
    const result = await UserStore.getOne(1);
    expect(result.id).toEqual(1);
    expect(result.first_name).toEqual("salma");
    expect(result.last_name).toEqual("osama");
    expect(result.password).toBeDefined();
  });
});