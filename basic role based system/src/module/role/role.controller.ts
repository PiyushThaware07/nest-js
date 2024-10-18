import { Body, Controller, Param, Post } from "@nestjs/common";
import { RoleService } from "./role.service";



@Controller("role")
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Post()
    createRole(@Body() payload: any) {
        return this.roleService.createRole(payload);
    }

    @Post(":roleId/assign")
    async assignPermissions(@Param("roleId") roleId: number, @Body() payload: any) {
        return this.roleService.assignPermissions(roleId, payload);
    }
}