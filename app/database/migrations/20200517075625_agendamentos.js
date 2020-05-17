
exports.up = function(knex) {
  return knex.schema.createTable('agendamentos', function(table){
    table.string('id').primary();
    table.string('data').notNullable();
    table.string('horario').notNullable();
    table.string('profissional').notNullable();
    table.string('local').notNullable();
    table.string('valor').notNullable();
    table.integer('atendido').notNullable();
    table.string('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('usuarios');
  
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('agendamentos');
};
