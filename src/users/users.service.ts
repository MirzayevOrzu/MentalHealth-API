import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateUserDto } from './dto/create-user.dto';
import { HashAdapter } from '../common/adapters/hash.service';
import { FindUserDto } from './dto/find-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectKnex() private knex: Knex,
        private hashAdapter: HashAdapter,
    ) {}

    async create(createUsersDto: CreateUserDto) {
        const { email, username, password } = createUsersDto;

        const existingUsers = await this.knex('users')
            .where('email', '=', email)
            .orWhere('username', '=', username)
            .first();

        if (existingUsers) {
            const reason =
                existingUsers.username === username ? 'email' : 'username';

            throw new BadRequestException(`User ${reason} is already used.`);
        }

        const hashedPassword = await this.hashAdapter.hash(password, 10);

        const [newUsers] = await this.knex('users')
            .insert({ ...createUsersDto, password: hashedPassword })
            .returning('*');

        return newUsers;
    }

    async show(findUserDto: FindUserDto) {
        const user = await this.knex('users').where(findUserDto).first();

        if (!user) {
            throw new NotFoundException('User is not found.');
        }

        return user;
    }

    async list({ offset = 0, limit = 5 }: FindUsersDto) {
        const dbQuery = this.knex('users').where({ is_deleted: false });

        const users = await dbQuery.clone().offset(offset).limit(limit);
        const total = await dbQuery.clone().count();

        return {
            data: users,
            meta: {
                total: +total[0].count,
                offset,
                limit,
            },
        };
    }

    async update(findUserDto: FindUserDto, updateUserDto: UpdateUserDto) {
        const [user] = await this.knex('users')
            .where(findUserDto)
            .update(updateUserDto)
            .returning('*');

        if (!user) {
            throw new NotFoundException('User is not found.');
        }

        return user;
    }

    async remove(findUserDto: FindUserDto) {
        const [user] = await this.knex('users')
            .where({ ...findUserDto, is_deleted: false })
            .first()
            .update({ is_deleted: true })
            .returning('*');

        if (!user) {
            throw new NotFoundException('User is not found.');
        }

        return user;
    }

    async changePassword(
        findUserDto: FindUserDto,
        { old_password, new_password }: ChangePasswordDto,
    ) {
        const user = await this.knex('users').where(findUserDto).first();

        if (!user) {
            throw new NotFoundException('User is not found.');
        }

        const match = await this.hashAdapter.compare(
            old_password,
            user.password,
        );

        if (!match) {
            throw new BadRequestException('Old password does not match.');
        }

        const hashed = await this.hashAdapter.hash(new_password, 10);

        await this.knex('users')
            .where(findUserDto)
            .update({ password: hashed });

        return user;
    }
}
