import { Body, Controller, Post } from "@nestjs/common";
import { PermissionService } from "./permission.service";

@Controller("permission")
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) { }

    @Post()
    createPermission(@Body() payload: any) {
        return this.permissionService.createPermissions(payload);
    }
}