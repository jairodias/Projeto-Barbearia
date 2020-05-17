
exports.up = function(knex) {
  return knex.schema.createTable('saldoUsuario', function(table){
    table.string('id').primary();
    table.string('valor').notNullable();
    table.string('tipo').notNullable(); /** PAGO OU ADICIONADO */
    table.string('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('usuarios');
  
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('saldoUsuario');
};
