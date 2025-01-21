import { Role } from '@/common/enums';
import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ description: 'Nome do usuário' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Email do usuário' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Senha do usuário' })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ description: 'Papel do usuário' })
    @IsEnum(Role)
    @IsOptional()
    role?: Role;

    @ApiProperty({ description: 'Número de telefone do usuário' })
    @IsString()
    @IsOptional()
    phoneNumber?: string;
}
