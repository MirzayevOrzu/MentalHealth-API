import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectKnex, Knex } from 'nestjs-knex';
import { HashAdapter } from '../common/adapters/hash.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectKnex() private knex: Knex,
        private hashAdapter: HashAdapter,
        private jwtService: JwtService,
    ) {}

    async loginUser({ username, password }: LoginUserDto) {
        const user = await this.knex('users').where({ username }).first();

        if (!user) {
            throw new UnauthorizedException(
                'Username or password is incorrect.',
            );
        }

        const match = await this.hashAdapter.compare(password, user.password);

        if (!match) {
            throw new UnauthorizedException(
                'Username or password is incorrect.',
            );
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        const token = this.jwtService.sign(payload);

        return { token };
    }
}
