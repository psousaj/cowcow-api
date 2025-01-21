import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { Response } from 'express';
import { EntityPropertyNotFoundError, QueryFailedError } from "typeorm";

@Catch(QueryFailedError, EntityPropertyNotFoundError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError | EntityPropertyNotFoundError, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();

        let message = 'Erro no banco de dados';
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let error = 'Internal Server Error';

        switch (true) {
            case exception instanceof QueryFailedError:
                if ((exception.driverError as any).code === '23505') {
                    statusCode = HttpStatus.CONFLICT;
                    message = 'Este registro já existe';
                    error = 'Conflict';

                    if ((exception.driverError as any).detail?.includes('email')) {
                        message = 'Este email já está sendo usado';
                    }
                }
                break;
            case exception instanceof EntityPropertyNotFoundError:
                const errorMessage = exception.message.replaceAll('"', '\'')
                statusCode = HttpStatus.BAD_REQUEST;
                message = errorMessage.slice(0, errorMessage.indexOf(' in '));
                error = 'Bad Request';
                break;
        }

        response.status(statusCode).json({
            statusCode,
            message,
            error
        });
    }
}