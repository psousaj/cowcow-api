import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    handleRequest(err: any, user: any, info: any, context: any) {
        if (err || !user) {
            throw err || new UnauthorizedException('Token inválido ou expirado');
        }
        return user;
    }
}