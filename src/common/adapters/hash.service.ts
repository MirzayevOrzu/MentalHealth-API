import { Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class HashAdapter {
    async genSalt(rounds = 10) {
        return bcryptjs.genSalt(rounds);
    }

    genSaltSync(rounds = 10) {
        return bcryptjs.genSaltSync(rounds);
    }

    async hash(s: string, saltOrRounds: string | number) {
        let salt = saltOrRounds;

        if (typeof salt === 'number') {
            salt = await this.genSalt(saltOrRounds as number);
        }

        return bcryptjs.hash(s, salt);
    }

    hashSync(s: string, saltOrRounds: string | number) {
        let salt = saltOrRounds;

        if (typeof salt === 'number') {
            salt = this.genSaltSync(saltOrRounds as number);
        }

        return bcryptjs.hashSync(s, salt);
    }

    compare(s: string, hash: string) {
        return bcryptjs.compare(s, hash);
    }

    compareSync(s: string, hash: string) {
        return bcryptjs.compareSync(s, hash);
    }
}
