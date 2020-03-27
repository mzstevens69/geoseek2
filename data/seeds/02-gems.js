exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("gems").then(function() {
    // Inserts seed entries
    return knex("gems").insert([
      {
        id: 1,
        title: "test1",
        created_by_user: 1,
        longitude: -118.4695,
        latitude: 33.985,
        difficulty: 1,
        description: "Venice Beach, CA"
      },
      {
        id: 2,
        title: "test2",
        created_by_user: 2,
        longitude: -90.1848,
        latitude: 38.6247,
        difficulty: 1,
        description: "St Louis Arch, MO"
      },
      {
        id: 3,
        title: "test3",
        created_by_user: 2,
        longitude: -77.0365,
        latitude: 38.8977,
        difficulty: 1,
        description: "The White House, washington dc"
      },
      {
        id: 4,
        title: "test2",
        created_by_user: 2,
        longitude: -90.1848,
        latitude: 38.6247,
        difficulty: 1,
        description: "St Louis Arch, MO"
      },
    ]);
  });
};
