import { Module } from "@nestjs/common";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "./entities/role.entity";
import { AuthEntity } from "../auth/entities/auth.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([RoleEntity,AuthEntity]),AuthModule],
    controllers: [RoleController],
    providers: [RoleService]
})

export class RoleModule {
    constructor() {
        console.log("role module");
    }
}