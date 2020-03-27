exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users").then(function() {
    // Inserts seed entries
    return knex("users").insert([
      { id: 1,
         username: "test1", 
         email: "test1@test1.com", 
         password: "test1" 
      },
      {
        id: 2,
        username: "test2",
        email: "test2@teste2.com",
        password: "test2"
      },
      {
        id: 3,

        username: "test3",
        email: "test3@teste3.com",
        password: "test3"
      }
    ]);
  });
};
