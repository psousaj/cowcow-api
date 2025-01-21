import { HealthEventType } from "@/common/enums";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNumber, IsObject, IsOptional, IsString, IsUUID } from "class-validator";

export class HealthMetaData {
    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'Medicação' })
    medication?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'Dosagem' })
    dosage?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'Veterinário' })
    veterinarian?: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ description: 'Custo' })
    cost?: number;
}

export class CreateHealthRecordDto {
    @IsUUID()
    @ApiProperty({ description: 'ID do animal' })
    animalId: string;

    @IsEnum(HealthEventType)
    @ApiProperty({ description: 'Tipo de evento de saúde' })
    type: HealthEventType;

    @IsDateString()
    @ApiProperty({ description: 'Data do evento de saúde' })
    date: Date;

    @IsOptional()
    @IsDateString()
    @ApiProperty({ description: 'Próxima data do evento de saúde', required: false })
    nextDate?: Date;

    @IsString()
    @ApiProperty({ description: 'Descrição do evento de saúde' })
    description?: string;

    @IsOptional()
    @IsObject()
    @ApiProperty({ description: 'Metadados adicionais', required: false, type: HealthMetaData })
    metadata?: HealthMetaData
}