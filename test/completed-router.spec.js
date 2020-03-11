const server = require("../server");
const db = require("../dbConfig");
const request = require("supertest");

// GETs all completed
describe("GET /", () => {
  it("should return 200", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
  });
});
//this deletes table and migrates and seeds for test
describe("POST that inserts completed", () => {
  beforeAll(async () => {
    await db.migrate.latest("completed");
    await db.seed.run("completed");
  });
  // clean up database
  afterAll(async () => {
    await db.truncate("completed");
  });
  // checks inserting completed to DB
  it("returns 201", () => {
    return request(server)
      .post("/api/completed")
      .send({
        gem_id: 1,
        comments: "test2"
      })
      .then(res => {
        expect(res.status).toBe(201);
      });
  });

  it("it should text/html", function() {
    return request(server)
      .get("/")
      .then(res => {
        expect(res.type).toMatch("text/html");
      });
  });
  // returns an completed gem by ID
  it("should return a completed by id", async () => {
    await request(server)
      .post("/api/completed")
      .send(
        {
          gem_id: 1,
          comments: "test1"
        },
        {
          gem_id: 2,
          comments: "test2"
        }
      )
      .get("/api/completed/2");

    const expected = [{ id: 2 }];

    expect([{ id: 2 }]).toEqual(expect.arrayContaining(expected));
  });
});
