import { CacheModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';
import configuration from '../config';
import { CacheConfigService } from '../config/cache.config';
import { KnexConfigService } from '../config/knex.config';
import { HashAdapter } from '../adapters/hash.service';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        CacheModule.registerAsync({
            useClass: CacheConfigService,
        }),
        KnexModule.forRootAsync({
            useClass: KnexConfigService,
        }),
    ],
    providers: [HashAdapter],
    exports: [HashAdapter],
})
export class CoreModules {}
