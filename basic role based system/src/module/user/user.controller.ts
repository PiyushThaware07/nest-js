import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    createUser(@Body() payload: any) {
        return this.userService.createUser(payload.name, payload.email);
    }

    @Post("assign")
    async assignRole() {
        const userId = 2;
        const roleId = 4;
        return this.userService.assignRole(userId, roleId);
    }
}