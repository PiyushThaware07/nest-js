import { Module } from "@nestjs/common";
import { PermissionController } from "./permission.controller";
import { PermissionService } from "./permission.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionEntity } from "./entities/permission.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity])],
  controllers: [PermissionController],
  providers: [PermissionService],
})

export class PermissionModule {
  constructor() {
    console.log("permission module");
  }
}