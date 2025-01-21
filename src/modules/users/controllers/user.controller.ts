import { Controller, Get, Post, Body, Param, Put, Delete, ParseUUIDPipe, Patch, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';
import { Role } from '@/common/enums';
import { Roles } from '@/modules/auth/decorators/roles.decorator';
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';

@ApiTags('Usuários')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.OWNER)
    @ApiOperation({ summary: 'Cria um novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.', type: User })
    @ApiResponse({ status: 409, description: 'Email já registrado.' })
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Get()
    @Roles(Role.OWNER)
    @ApiOperation({ summary: 'Lista todos os usuários' })
    @ApiResponse({ status: 200, description: 'Lista de usuários.', type: [User] })
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    @Roles(Role.OWNER, Role.OPERATOR)
    @ApiOperation({ summary: 'Busca um usuário pelo ID' })
    @ApiResponse({ status: 200, description: 'Usuário encontrado.', type: User })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
    async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Patch(':id')
    @Roles(Role.OWNER)
    @ApiOperation({ summary: 'Atualiza um usuário pelo ID' })
    @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.', type: User })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateUserDto: UpdateUserDto): Promise<void> {
        await this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    @Roles(Role.OWNER)
    @ApiOperation({ summary: 'Remove um usuário pelo ID' })
    @ApiResponse({ status: 200, description: 'Usuário removido com sucesso.' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
    async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
        await this.userService.remove(id);
    }
}
