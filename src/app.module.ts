import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvModule } from './shared/env/env.module';
import { DatabaseModule } from './config/database/database.module';
import { envSchema } from './shared/env/validation';
import { AnimalsModule } from './modules/animals/animals.module';
import { AuthModule } from './modules/auth/auth.module';
import { FinancialModule } from './modules/financial/financial.module';
import { HealthModule } from './modules/health/health.module';
import { ProductionModule } from './modules/production/production.module';
import { UsersModule } from './modules/users/users.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';

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
        FinancialModule,
        HealthModule,
        ProductionModule,
        UsersModule
    ],
    providers: [],
})
export class AppModule { }
