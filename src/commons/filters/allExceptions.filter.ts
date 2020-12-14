import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { ServiceException } from '../custom-exceptions/service.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        let status, message;
        if (exception instanceof BadRequestException) {
            status = exception.getStatus();
            message = exception.message
        } else if (exception instanceof ServiceException) {
            status = exception.getStatus();
            message = exception.message
        } else if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message
        }
        else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = "Error Occured, check console";

        }

        response.status(status).json({
            status: status,
            message: message,
        });
    }
}