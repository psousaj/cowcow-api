import { Module } from '@nestjs/common';
import { EnvModule } from './shared/env/env.module';
import { DatabaseModule } from './config/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './shared/env/validation';
import { AnimalsModule } from './modules/animals/animals.module';
import { AuthModule } from './modules/auth/auth.module';
import { FinancialModule } from './modules/financial/financial.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            validate: (env) => envSchema.parse(env),
            isGlobal: true,
        }),
        DatabaseModule,
        EnvModule,
        AuthModule,
        AnimalsModule,
        FinancialModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
