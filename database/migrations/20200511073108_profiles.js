
exports.up = function(knex) {
    return knex.schema.createTable('profiles', function(table){
        table.increments();

        table.string('name').notNullable();
        table.string('cpf').notNullable();
        table.string('cargo_id').notNullable();

        table.foreign('cargo_id').references('id').inTable('cargos');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('profiles');
};
