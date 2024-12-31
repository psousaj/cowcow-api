export class CreateProductionDto {
    @IsUUID()
    animalId: string;

    @IsNumber()
    @Min(0)
    quantity: number;

    @IsDateString()
    date: Date;

    @IsOptional()
    @IsObject()
    metadata?: {
        quality?: string;
        notes?: string;
    };
}