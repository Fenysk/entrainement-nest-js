import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class EnrichResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('🏁 Starting Enrich Response Interceptor...');

    const request = context.switchToHttp().getRequest();

    const now = new Date();
    const timeZoneOffset = `${now.getTimezoneOffset() / 60} hours`;
    const result = {
      headers: request.headers,
      dataLogged: now.toISOString(),
      timeZoneOffset,
    };

    return next.handle().pipe(
      map(valueFromRouteHandler => {
        console.log('✅ Ending Enrich Response Interceptor...');
        return {
          initalContent: valueFromRouteHandler,
          enrichedContent: result,
          length: valueFromRouteHandler.length,
        }
      })
    );
  }
}
