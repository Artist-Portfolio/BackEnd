exports.up = function(knex) {
  return knex.schema.createTable("artwork", tbl => {
    tbl.increments();
    tbl.text("artist", 128).notNullable();
    tbl.text("title").notNullable();
    tbl.text("description").notNullable();
    tbl
      .text("imgUrl")
      .notNullable()
      .unique();
    tbl
      .integer("user_id")
      .references("id")
      .inTable("users");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("artwork");
};
