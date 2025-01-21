import { ExpenseCategory, TransactionType } from "@/common/enums";
import { IsDateString, IsEnum, IsNumber, IsObject, IsOptional, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FinancialMetaData {
    @ApiProperty({ description: 'Número da fatura', required: false })
    @IsOptional()
    @IsString()
    invoice?: string;

    @ApiProperty({ description: 'Nome do fornecedor', required: false })
    @IsOptional()
    @IsString()
    provider?: string;

    @ApiProperty({ description: 'Método de pagamento', required: false })
    @IsOptional()
    @IsString()
    paymentMethod?: string;
}

export class CreateFinancialRecordDto {
    @ApiProperty({ enum: TransactionType, description: 'Tipo de transação' })
    @IsEnum(TransactionType)
    type: TransactionType;

    @ApiProperty({ enum: ExpenseCategory, required: false, description: 'Categoria de despesa' })
    @IsOptional()
    @IsEnum(ExpenseCategory)
    category?: ExpenseCategory;

    @ApiProperty({ description: 'Valor da transação' })
    @IsNumber()
    @Min(0)
    amount: number;

    @ApiProperty({ description: 'Data da transação' })
    @IsDateString()
    date: Date;

    @ApiProperty({ required: false, description: 'Descrição da transação' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ required: false, type: FinancialMetaData, description: 'Metadados financeiros' })
    @IsOptional()
    @IsObject()
    metadata?: FinancialMetaData
}
