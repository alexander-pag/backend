import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserDomain } from 'src/core/domain/user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true; // Si no hay roles requeridos, permitir el acceso
    }

    const request = context.switchToHttp().getRequest();
    const user: UserDomain = request.user; // El usuario se obtiene del token JWT

    if (user.role.value === 'super_admin') {
      return true;
    }

    if (!user || !requiredRoles.includes(user.role.value)) {
      throw new ForbiddenException(
        'No tienes permiso para acceder a esta ruta.',
      );
    }

    return true;
  }
}
