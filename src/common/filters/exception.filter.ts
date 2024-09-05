import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof BadRequestException) {
      const status = exception.getStatus();
      const responseBody = exception.getResponse();

      const validationErrors = (responseBody as any).message || ["Bad Request"];

      return response.status(status).json({
        code: status,
        status: "fail",
        message: validationErrors[0],
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.message;

      response.status(status).json({
        code: status,
        status: "fail",
        message,
      });

      return;
    }

    console.error(exception);

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
    });
  }
}
