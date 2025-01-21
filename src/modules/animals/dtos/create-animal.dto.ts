import { Sex } from "@/common/enums";
import { IsDateString, IsEnum, IsObject, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AnimalMetadata {
    @ApiProperty({ description: 'Raça do animal', example: 'Holandesa' })
    breed?: string;

    @ApiProperty({ description: 'Origem do animal', example: 'Fazenda XYZ' })
    origin?: string;

    @ApiProperty({ description: 'Notas adicionais sobre o animal', example: 'Animal dócil e saudável' })
    notes?: string;
};

export class CreateAnimalDto {
    @ApiProperty({ description: 'Identificação do animal', example: '12345' })
    @IsString()
    identification: string;

    @ApiProperty({ description: 'Apelido do animal', example: 'Bessie' })
    @IsString()
    nickname: string;

    @ApiProperty({ description: 'Data de nascimento do animal', example: '2023-01-01' })
    @IsDateString()
    birthDate: Date;

    @ApiProperty({ description: 'Sexo do animal', enum: Sex })
    @IsEnum(Sex)
    sex: Sex;

    @ApiProperty({ description: 'Metadados opcionais sobre o animal', required: false, type: AnimalMetadata })
    @IsOptional()
    @IsObject()
    metadata?: AnimalMetadata;
}
