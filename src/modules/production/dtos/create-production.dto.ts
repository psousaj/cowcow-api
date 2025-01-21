import { IsDateString, IsNumber, IsObject, IsOptional, IsUUID, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ProductionMetadata {
    @ApiProperty({ description: 'Qualidade do produto' })
    quality?: string;

    @ApiProperty({ description: 'Notas adicionais' })
    notes?: string;
};

export class CreateProductionDto {
    @ApiProperty({ description: 'ID do animal' })
    @IsUUID()
    animalId: string;

    @ApiProperty({ description: 'Quantidade' })
    @IsNumber()
    @Min(0)
    quantity: number;

    @ApiProperty({ description: 'Data' })
    @IsDateString()
    date: Date;

    @ApiProperty({ description: 'Metadados', required: false, type: ProductionMetadata })
    @IsOptional()
    @IsObject()
    metadata?: ProductionMetadata
}