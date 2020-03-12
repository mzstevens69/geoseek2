const request = require("supertest");
const server = require("../server");
const db = require("../dbConfig");

beforeEach(() => {
  return db.migrate.rollback("users").then(() => db.migrate.latest("users"));
});

describe("post a photo", () => {
  it("Post /api/photo/add/:id", async () => {
    const register = await request(server)
      .post("/api/users/register")
      .send({ username: "dude", email: "dude@dude.com", password: "dude" });

    const login = await request(server)
      .post("/api/users/login")
      .send({ username: "dude", password: "dude" });

    const addGem = await request(server)
      .post("/api/gems")
      .send({
        title: "test",
        longitude: "86.11133",
        latitude: "36.01042",
        difficulty: 1,
        description: "dude, heres a gem"
      });

    const res = await request(server)
      .post("/api/photo/add/1")
      .send({
        photo_url: "FB_IMG_1567806261583.jpg"
      });

    expect(res.status).toBe(201);
  });
});

describe("cant post a photo without a gem", () => {
  it("Post /api/photo/add/:id", async () => {
    const register = await request(server)
      .post("/api/users/register")
      .send({ username: "dude", email: "dude@dude.com", password: "dude" });

    const login = await request(server)
      .post("/api/users/login")
      .send({ username: "dude", password: "dude" });

    const res = await request(server)
      .post("/api/photo/add/1")
      .send({
        photo_url: "FB_IMG_1567806261583.jpg"
      });

    expect(res.status).toBe(400);
  });
});

describe("delete a photo", () => {
  it("Delete /api/photo/delete/:id", async () => {
    const register = await request(server)
      .post("/api/users/register")
      .send({ username: "dude", email: "dude@dude.com", password: "dude" });

    const login = await request(server)
      .post("/api/users/login")
      .send({ username: "dude", password: "dude" });

    const addGem = await request(server)
      .post("/api/gems")
      .send({
        title: "test",
        longitude: "86.11133",
        latitude: "36.01042",
        difficulty: 1,
        description: "dude, heres a gem"
      });

    const addPhoto = await request(server)
      .post("/api/photo/add/1")
      .send({
        photo_url: "FB_IMG_1567806261583.jpg"
      });

    const res = await request(server).delete("/api/photo/delete/1");
    expect(res.status).toBe(200);
  });
});
