import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post("signup")
    signup(@Body() payload: any) {
        return this.authService.signup(payload)
    }


    @Public()
    @Post("signin")
    signin(@Body() payload: any) {
        return this.authService.signin(payload);
    }

    @Get("all")
    findAll(){
        return this.authService.findAll();
    }
}