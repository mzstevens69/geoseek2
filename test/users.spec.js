const server = require("../server");
const request = require("supertest");
const db = require("../dbConfig");

beforeEach(() => {
  return db.migrate.rollback("users").then(() => db.migrate.latest("users"));
});

describe("Auth", () => {
  it("gets 201 from register", async () => {
    const res = await request(server)
      .post("/api/users/register")
      .send({
        username: "picklerick",
        email: "sechuansauce@rsanchez.com",
        password: "jaguar"
      });
    expect(res.status).toBe(201);
  });
  it("gives response 401 to invalid user", async () => {
    const res = await request(server)
      .post("/api/users/login")
      .send({ username: "fart", password: "goodbyemoonmen" });
    expect(res.status).toBe(401);
  });
});
describe("login user", () => {
  it("Post /api/users/login", async () => {
    const register = await request(server)
      .post("/api/users/register")
      .send({
        username: "pickleRick",
        email: "sechuansauce@rsanchez.com",
        password: "jaguar"
      });
    const res = await request(server)
      .post("/api/users/login")
      .send({ username: "pickleRick", password: "jaguar" });
    expect(res.status).toBe(200);
    expect(res.body.token);
  });
});
describe("remove user", () => {
  it("del /api/users/:id", async () => {
    const register = await request(server)
      .post("/api/users/register")
      .send({
        username: "pickleRick",
        email: "sechuansauce@rsanchez.com",
        password: "jaguar"
      });
    const login = await request(server)
      .post("/api/users/login")
      .send({ username: "pickleRick", password: "jaguar" });
    const res = await request(server).delete("/api/users/1");
    expect(res.status).toBe(200);
  });
});
