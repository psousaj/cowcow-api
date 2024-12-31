import { Module } from '@nestjs/common';
import { EnvModule } from './shared/env/env.module';
import { DatabaseModule } from './config/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './shared/env/validation';

@Module({
    imports: [
        ConfigModule.forRoot({
            validate: (env) => envSchema.parse(env),
            isGlobal: true,
        }),
        EnvModule,
        DatabaseModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
