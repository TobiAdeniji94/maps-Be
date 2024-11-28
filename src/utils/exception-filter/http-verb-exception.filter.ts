import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

@Catch(HttpException, NotFoundException)
export class HttpVerbExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception.getStatus();
    const message = `Wrong HTTP verb used. Please use the correct HTTP verb for this route.`;

    response.status(status).json({
      status: false,
      message,
    });
  }
}
