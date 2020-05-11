
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
      table.string('login').primary();
      table.string('password').notNullable();

      table.string('profile_id').notNullable();

      table.foreign('profile_id').references('id').inTable('profiles');
  });
};

exports.down = function(knex) {
  return kenex.schema.dropTable('users');
};
