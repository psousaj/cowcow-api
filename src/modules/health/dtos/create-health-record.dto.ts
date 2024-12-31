import { HealthEventType } from "@/common/enums";
import { IsDateString, IsEnum, IsObject, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateHealthRecordDto {
    @IsUUID()
    animalId: string;

    @IsEnum(HealthEventType)
    type: HealthEventType;

    @IsDateString()
    date: Date;

    @IsOptional()
    @IsDateString()
    nextDate?: Date;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsObject()
    metadata?: {
        medication?: string;
        dosage?: string;
        veterinarian?: string;
        cost?: number;
    };
}