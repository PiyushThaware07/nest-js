import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { RoleService } from './role.service';


@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Get("all")
    findAll() {
        return this.roleService.findAll();
    }

    @Post("add")
    create(@Body() payload: any) {
        return this.roleService.create(payload);
    }

    @Post(":roleId")
    assignPermission(@Body() payload: any, @Param("roleId") roleId: string) {
        return this.roleService.assignPermission(roleId, payload);
    }

    @Post(":roleId/assign")
    assignRole(@Request() req, @Param("roleId") roleId: string) {
        return this.roleService.assignRole(req.user.id, roleId);
    }
}