import { ExpenseCategory, TransactionType } from "@/common/enums";
import { IsDateString, IsEnum, IsNumber, IsObject, IsOptional, IsString, Min } from "class-validator";

export class CreateFinancialRecordDto {
    @IsEnum(TransactionType)
    type: TransactionType;

    @IsOptional()
    @IsEnum(ExpenseCategory)
    category?: ExpenseCategory;

    @IsNumber()
    @Min(0)
    amount: number;

    @IsDateString()
    date: Date;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsObject()
    metadata?: {
        invoice?: string;
        provider?: string;
        paymentMethod?: string;
    };
}