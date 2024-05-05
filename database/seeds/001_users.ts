import { Knex } from 'knex';
import * as bcryptjs from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('users').del();

    // Inserts seed entries
    await knex('users').insert([
        {
            // id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@gmail.com',
            username: 'johndoe',
            password: bcryptjs.hashSync('123456', 10),
        },
        {
            // id: 2,
            first_name: 'Jane',
            last_name: 'Doe',
            email: 'janedoe@gmail.com',
            username: 'janedoe',
            password: bcryptjs.hashSync('123456', 10),
        },
    ]);
}
