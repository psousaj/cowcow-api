import { NotificationType } from "@/common/enums";
import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNotificationDto {
    @ApiProperty({ description: 'ID do usuário' })
    @IsUUID()
    userId: string;

    @ApiProperty({ description: 'Tipo de notificação' })
    @IsEnum(NotificationType)
    type: NotificationType;

    @ApiProperty({ description: 'Mensagem da notificação' })
    @IsString()
    message: string;

    @ApiProperty({ description: 'Data agendada para a notificação', required: false })
    @IsOptional()
    @IsDateString()
    scheduledFor?: Date;
}