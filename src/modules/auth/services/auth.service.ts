import { User } from "@/modules/users/entities/user.entity";
import { Injectable, ConflictException, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "../dto/auth.dto";
import { UserService } from "@/modules/users/services/user.service";
import * as crypto from 'node:crypto'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        if (user && user.password === hashedPassword) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        const payload: any = {
            email: user.email,
            sub: user.id,
            role: user.role
        };

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            accessToken: await this.jwtService.signAsync(payload),
        };
    }

    async register(registerDto: RegisterDto) {
        // Verificar se usuário já existe
        const existingUser = await this.userService.findByEmail(registerDto.email);
        (registerDto.email);
        if (existingUser) {
            throw new ConflictException('Email já registrado');
        }

        // Hash da senha
        const hashedPassword = crypto.createHash('sha256').update(registerDto.password).digest('hex');

        // Criar usuário
        const user = await this.userService.create({
            ...registerDto,
            password: hashedPassword,
        });

        // Remover senha do retorno
        const { password, ...result } = user;
        return result;
    }

    async refreshToken(user: User) {
        if (!user) {
            throw new BadRequestException('Nenhum usuário logado');
        }

        const payload: any = {
            email: user.email,
            sub: user.id,
            role: user.role
        };

        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}