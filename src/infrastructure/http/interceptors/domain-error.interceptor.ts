import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { DomainError } from 'src/core/exceptions/domain/DomainError';
import { NotFoundError } from 'src/core/exceptions/domain/NotFoundError';

@Injectable()
export class DomainErrorInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof NotFoundError) {
          return throwError(() => new NotFoundException(error.message));
        }
        if (error instanceof DomainError)
          return throwError(() => new BadRequestException(error.message));
        return throwError(() => error);
      }),
    );
  }
}
