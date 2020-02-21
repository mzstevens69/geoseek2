const db = require("../dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
};

// async function add(user) {
//     const id = await db('users').insert(user);
  
//     return findById(id);
//   }

function add(user){
return db('users').insert(user)
}

  function find(){
    return db('users').select('id','username','email')
    };


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
