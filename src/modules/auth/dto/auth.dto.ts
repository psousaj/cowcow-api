import { Role } from "@/common/enums";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from "class-validator";

export class LoginDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    password: string;
}

export class RegisterDto {
    @ApiProperty()
    @IsString()
    @MinLength(3)
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ enum: Role, default: Role.OPERATOR })
    @IsEnum(Role)
    @IsOptional()
    role?: Role;
}