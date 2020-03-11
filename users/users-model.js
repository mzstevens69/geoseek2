const db = require("../dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove
};

function add(user) {
  return db("users").insert(user);
}

function find() {
  return db("users").select("id", "username", "email");
}

function findBy(filter) {
  return db("users").where(filter);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}
