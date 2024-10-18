import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../../auth/auth.service';
import { TEMPORARY_PERMISSION_KEY } from '../decorator/role.decorator';


@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, private readonly authService: AuthService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const userId = request.user?.id;

        const user = await this.authService.validateById(userId);

        // Determine required permissions based on the request method
        const requiredPermissions = this.getRequiredPermissions(request.method);
        // Check if the route should skip permission checks
        const skipPermissions = this.reflector.get<boolean>('skipPermissions', context.getHandler());
        if (skipPermissions) return true;
        // Check if the route have some temporary permissions too
        const temporaryPermissions = this.reflector.get<string[]>(TEMPORARY_PERMISSION_KEY, context.getHandler());
        if (temporaryPermissions) return true;


        if (requiredPermissions.length > 0) {
            const hasPermission = user.roles.some((role) =>
                role.permission.some((permission) => requiredPermissions.includes(permission.name))
            );

            if (!hasPermission) {
                throw new ForbiddenException("You don't have permission to access this resource");
            }
        }

        return true;
    }

    // Map HTTP methods to required permissions
    private getRequiredPermissions(method: string): string[] {
        switch (method) {
            case 'GET':
                return ['read']; // Example: all GET requests require 'read' permission
            case 'POST':
                return ['create']; // Example: all POST requests require 'create' permission
            case 'PUT':
                return ['update']; // Example: all PUT requests require 'update' permission
            case 'PATCH':
                return ['patch']; // Example: all PATCH requests require 'patch' permission
            case 'DELETE':
                return ['delete']; // Example: all DELETE requests require 'delete' permission
            default:
                return [];
        }
    }
}
