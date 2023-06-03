exports.up = function (knex) {
  return knex.schema.createTable('todos', tbl => {
    tbl.increments();

    tbl
      .text('activity')
      .notNullable();

    tbl.text('status').notNullable();

  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('todos');
};
