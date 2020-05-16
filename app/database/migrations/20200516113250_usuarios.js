
exports.up = function(knex) {
  return knex.schema.createTable('usuarios', function(table){
    table.string('id').primary();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.string('passwordResetToken');
    table.date('passwordResetExpires');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('usuarios');
};
