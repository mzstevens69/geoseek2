const db = require('../dbConfig')


module.exports = {
    insert,
    findById,
    getCompleted,
    find
}

// add a completed gem to the project table showing project that it created
function insert(completed) {
    return db('completed')
        .insert(completed)
        .then(ids => ({ id: ids[0] }))
}
// all completed in the completed table
function getCompleted() {
    return db('completed')
}
function findById(id) {
    return db('completed')
      .where({ id })
      .first()
  }
function find(filter) {
    return db('gems')
        .where
}
