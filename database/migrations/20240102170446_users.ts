import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.string('first_name');
        table.string('last_name');
        table.string('email').unique();
        table.string('username').unique();
        table.string('password');
        table.boolean('is_deleted').defaultTo(false, {});
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}
