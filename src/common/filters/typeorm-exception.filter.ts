import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { Response } from 'express';
import { QueryFailedError } from "typeorm";

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();

        let message = 'Erro no banco de dados';
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

        if ((exception.driverError as any).code === '23505') {
            statusCode = HttpStatus.CONFLICT;
            message = 'Este registro já existe';

            if ((exception.driverError as any).detail?.includes('email')) {
                message = 'Este email já está sendo usado';
            }
        }

        response.status(statusCode).json({
            statusCode,
            message,
            error: 'Conflict'
        });
    }
}