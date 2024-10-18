import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { UserService } from './user/user.service'; // Ensure the path is correct
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector, private usersService: UserService) { }


    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const expectedHeaderKey = 'X-Role';
        const headerValue = request.headers[expectedHeaderKey.toLowerCase()];
        const user = await this.usersService.findUserWithRoles(headerValue);
        const requiredPermission = this.reflector.get<string>('permission', context.getHandler());
        if (!requiredPermission) return true;
        const hasPermission = user.roles.some((role) =>
            role.permissions.some((permissions) => permissions.name === requiredPermission),
        );
        if (!hasPermission) throw new ForbiddenException('You do not have permission to access this resource.');
        return true;
    }
}
