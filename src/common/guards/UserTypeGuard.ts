import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from 'src/common/enums/UserType';
import { ROLES_KEY } from '../decorators';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {

    const requiredUserType = this.reflector.getAllAndOverride<UserType>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
		]);

    if (!requiredUserType) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return user.userType === requiredUserType;
  }
}