import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('🏁 Starting Auth guard...');

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    const request = context.switchToHttp().getRequest();

    const authorization = request.headers.authorization.split(' ')[1];

    if (!authorization)
      return false;

    const isAuth = roles.includes(authorization);

    console.log('✅ Ending Auth guard !');

    if (!isAuth)
      return false;

    return true;
  }
}
