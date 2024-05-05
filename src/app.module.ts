import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModules } from './common/modules/core.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [CoreModules, UsersModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
