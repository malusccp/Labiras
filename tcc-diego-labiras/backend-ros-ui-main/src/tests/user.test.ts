import app from "../app";
import { pool } from "../database/db";
import { User } from "../models/user";

describe("User react ros ui", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("It should return an user when exists", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/users/1",
    });

    const { data }: { data: User } = response.json();

    expect(response.statusCode).toBe(200);
    expect(data).toEqual({
      id: 1,
      username: "test_user",
      password: "hashed_password",
    });
  });

  it("It should return an error when user does not exists", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/users/2",
    });

    const { status, message } = response.json();

    expect(response.statusCode).toBe(404);
    expect(status).toBe(404);
    expect(message).toBe("Usuário não encontrado");
  });
});
