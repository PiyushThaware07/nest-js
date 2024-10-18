import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
import { RoleModule } from "../role/role.module";
import { Role } from "../role/entities/role.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User,Role]),RoleModule],
    controllers: [UserController],
    providers: [UserService],
    exports : [UserService],
})

export class UserModule {
    constructor() {
        console.log("user module");
    }
}