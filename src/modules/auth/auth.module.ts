import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { RolesGuard } from "./guards/roles.guard";
import { AuthService } from "./services/auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { EnvModule } from "@/shared/env/env.module";
import { EnvService } from "@/shared/env/env.service";

@Module({
    imports: [
        UsersModule,
        PassportModule,
        EnvModule,
        JwtModule.registerAsync({
            inject: [EnvService],
            imports: [EnvModule],
            useFactory: (envService: EnvService) => ({
                secret: envService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: envService.get('JWT_EXPIRATION'),
                },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
    exports: [AuthService],
})
export class AuthModule { }