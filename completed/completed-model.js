const db = require("../dbConfig");

module.exports = {
  insert,
  findById,
  getCompleted,
  getCompletedByUser,
  getCompletedByGemId,
  remove
};

// add a completed gem to the completed table showing completed that it created

function insert(completed) {
  return db("completed")
    .returning("id")
    .insert(completed)
    .then(ids => {
      return findById(ids[0]);
    });
}

// all completed in the completed table

function getCompleted() {
  return db("completed");
}

// finds a completed by completed Id

function findById(id) {
  return db("completed")
    .where({ id })
    .first();
}

// Deletes a completed gem by Id

function remove(id) {
  return db("completed")
    .where("id", id)
    .del();
}

// Gets Completed Gems by specific User

function getCompletedByUser(id) {
  return db('completed')
    .returning(['id','completed_by','gem_id','comments'])
    .where('completed_by', id)
}

function getCompletedByGemId(id) {
return db('completed')
    .returning(['id','completed_by','gem_id','comments'])
    .where('gem_id', id)
}