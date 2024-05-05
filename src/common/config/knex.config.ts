import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KnexModuleOptions, KnexModuleOptionsFactory } from 'nestjs-knex';
import { DatabaseConfigI } from '.';

@Injectable()
export class KnexConfigService implements KnexModuleOptionsFactory {
    constructor(private configService: ConfigService) {}

    createKnexModuleOptions(): KnexModuleOptions {
        const dbConfig = this.configService.get<DatabaseConfigI>('database');

        return {
            config: {
                client: 'postgres',
                useNullAsDefault: true,
                connection: {
                    host: dbConfig.host,
                    user: dbConfig.user,
                    password: dbConfig.password,
                    database: dbConfig.name,
                    port: dbConfig.port,
                },
            },
        };
    }
}
