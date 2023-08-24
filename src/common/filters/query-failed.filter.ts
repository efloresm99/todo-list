import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  logger = new Logger(QueryFailedExceptionFilter.name);
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const conflictError = exception.message.includes('unique constraint');
    const friendlyMessage = exception?.driverError?.detail;
    const technicalMessage = exception?.message;
    const showMessage = friendlyMessage || technicalMessage;
    const status = conflictError ? HttpStatus.CONFLICT : 500;
    const errorResponse = {
      status: status,
      message: `Query Failed Error: ${showMessage}`,
      error: HttpStatus[status],
    };

    response.status(status).json(errorResponse);
  }
}
