import { Body, Controller, Delete, Get, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/auth.decorator';
import { Permission, SkipPermissions, TemporaryPermission } from '../role/decorator/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';

@Controller('auth')
@UseGuards(RoleGuard)
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post("signup")
    @SkipPermissions()
    signup(@Body() payload: any) {
        return this.authService.signup(payload)
    }
    
    
    @Public()
    @Post("signin")
    @SkipPermissions()
    signin(@Body() payload: any) {
        return this.authService.signin(payload);
    }

    @Get("")
    findAll() {
        return this.authService.findAll();
    }

    @Put()
    updateById() {
        return "update by id";
    }

    @Delete()
    @TemporaryPermission(['delete'])
    @Permission("delete")
    deleteById() {
        return "delete by id";
    }

    @Patch()
    publishById() {
        return "publish by id";
    }
}