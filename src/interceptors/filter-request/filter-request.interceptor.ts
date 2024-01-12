import { CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class FilterRequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('🏁 Starting Filter Request Interceptor...');

    const request = context.switchToHttp().getRequest();

    const forbiddenWords = [
      'connard',
      'merde',
      'salope',
      'pute',
      'enculé',
    ]

    const isForbidden = Object.values(request.body).some((field) =>
      typeof field === 'string' && forbiddenWords.some(word => field.toLowerCase().includes(word))
    );

    console.log('✅ Ending Filter Request Interceptor !');

    if (isForbidden) {
      throw new ForbiddenException(`🚫 Forbidden word detected`);
    }

    return next.handle();
  }
}
