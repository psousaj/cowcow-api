import { NotificationType } from "@/common/enums";
import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateNotificationDto {
    @IsUUID()
    userId: string;

    @IsEnum(NotificationType)
    type: NotificationType;

    @IsString()
    message: string;

    @IsOptional()
    @IsDateString()
    scheduledFor?: Date;
}