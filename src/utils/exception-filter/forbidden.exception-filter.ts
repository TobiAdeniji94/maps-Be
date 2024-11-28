import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (status === HttpStatus.FORBIDDEN) {
      response.status(HttpStatus.FORBIDDEN).json({
        status: false,
        message: 'You do not have permission to access this resource.',
      });
    } else {
      response.status(status).json(exception.getResponse());
    }
  }
}
