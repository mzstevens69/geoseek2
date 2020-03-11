const db = require("../dbConfig");

const Completed = require("../completed/completed-model");

describe("the completed model", () => {
  beforeEach(async () => {
    await db.migrate.latest("completed");
    await db.seed.run("completed");
  });
  // clean up database
  afterEach(async () => {
    await db.truncate("completed");
  });
  describe("insert", () => {
    it("adds the new completed gem to DB", async () => {
      //call insert passing a hobbit
      await Completed.insert({
        gem_id: 1,
        comments: "test1"
      });
      //open the db and see the completed is there
      const completed = await db("completed");
      expect(completed).toHaveLength(1);
    });

    describe("findbyid", () => {
      it("finds completed by id", async () => {
        await db("completed").insert([
          {
            gem_id: 1,
            comments: "test1"
          },
          {
            gem_id: 2,
            comments: "test2"
          }
        ]);
        const completed = await Completed.findById(2);

        expect(completed.id).toBe(2);
      });
      it("returns undefined on an invalid", async () => {
        const completed = await Completed.findById(2);
        expect(completed).toBeUndefined();
      });
    });
  });
});
