import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogClientInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('🏁 Starting Log Client interceptor...');

    const request = context.switchToHttp().getRequest();

    const client = {
      date: new Date().toISOString(),
      urlRequest: request.url,
      ip: request.ip,
      navigator: request.headers['user-agent'],
    }

    return next.handle().pipe(
      tap(() => {
        console.log(client)
        console.log('✅ Ending Log Client interceptor...')
      })
    )
  }
}
