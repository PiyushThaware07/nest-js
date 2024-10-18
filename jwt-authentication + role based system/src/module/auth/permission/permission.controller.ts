import { Body, Controller, Get, Post } from "@nestjs/common";
import { PermissionService } from "./permission.service";

@Controller("permission")
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) { }

    @Get("all")
    findAll() {
        return this.permissionService.findAll();
    }


    @Post("add")
    create(@Body() payload: any) {
        return this.permissionService.create(payload);
    }
}