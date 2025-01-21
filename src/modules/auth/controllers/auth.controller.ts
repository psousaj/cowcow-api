import { Controller, Post, Body, UnauthorizedException, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { User } from "../../users/entities/user.entity";
import { CurrentUser } from "../decorators/current-user.decorator";
import { LoginDto, RegisterDto } from "../dto/auth.dto";
import { AuthService } from "../services/auth.service";
import { Public } from "../decorators/public.decorator";

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @Public()
    @ApiOperation({ summary: 'Login de usuário' })
    @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(
            loginDto.email,
            loginDto.password,
        );

        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        return this.authService.login(user);
    }

    @Post('register')
    @Public()
    @ApiOperation({ summary: 'Registro de novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso' })
    @ApiResponse({ status: 409, description: 'Email já registrado' })
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Get('refresh')
    @ApiOperation({ summary: 'Renovar token de acesso' })
    @ApiResponse({ status: 200, description: 'Token renovado com sucesso' })
    @ApiResponse({ status: 401, description: 'Token inválido' })
    async refreshToken(@CurrentUser() user: User) {
        return this.authService.refreshToken(user);
    }
}