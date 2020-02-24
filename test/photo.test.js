const request = require("supertest");
const server = require("../photo/photo-router");

const photo = ["Raymond", 1, "I broke my knee", "B8482625-AE9B-403A-A767-E8A035FBBF36.heic"];


describe("GET / ", () => {
    test("It should respond have  name, gemId,description, Photo_url, ", async () => {
      const res = await request(photo-router).get("/");
      expect(res.body).toEqual(["Elie", "Matt", "I broke my knee", "B8482625-AE9B-403A-A767-E8A035FBBF36.heic"]);
    });
  });