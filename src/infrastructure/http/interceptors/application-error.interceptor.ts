import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApplicationError } from 'src/core/exceptions/application/ApplicationError';

@Injectable()
export class ApplicationErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof ApplicationError) {
          return throwError(() => new BadRequestException(error.message));
        }
        return throwError(() => error);
      }),
    );
  }
}
