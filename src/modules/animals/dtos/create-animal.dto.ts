export class CreateAnimalDto {
    @IsString()
    identification: string;

    @IsString()
    nickname: string;

    @IsDateString()
    birthDate: Date;

    @IsEnum(Sex)
    sex: Sex;

    @IsOptional()
    @IsObject()
    metadata?: {
        breed?: string;
        origin?: string;
        notes?: string;
    };
}