exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments();
      tbl
        .string("username")
        .notNullable()
        .unique();
      tbl.string("email").notNullable();
      tbl.string("password").notNullable();
    })
    .createTable("gems", tbl => {
      tbl.increments();
      tbl.string("title")
      .notNullable()
      tbl.integer('created_by_user')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      tbl.float("longitude").notNullable();
      tbl.float("latitude").notNullable();
      tbl.integer("difficulty");
      tbl.text("description", 150).notNullable();
    })
    .createTable("photo_clues", tbl => {
      tbl.string("name");
      tbl.string("description");
      tbl.increments();
      tbl
        .integer("gem_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("gems");
      tbl.string("photo_url").notNullable();
    })
    .createTable("completed", tbl => {
      tbl.increments();
      tbl
        .integer("gem_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("gems")
        .onDelete("CASCADE");
      tbl.timestamp("completed_at").defaultTo(knex.fn.now())
      tbl.integer('completed_by')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      tbl.text("comments", 150);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("completed")
    .dropTableIfExists("photo_clues")
    .dropTableIfExists("users")
    .dropTableIfExists("gems");
};
// changes
