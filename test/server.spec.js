const request = require("supertest");
const server = require("../server");

describe("server.js", function() {
  describe("environment", function() {
    it("should set environment to testing", function() {
      expect(process.env.NODE_ENV).toBe("testing");
    });
  });
  describe("GET /", function() {
    it("it shoud return 200", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });
});
