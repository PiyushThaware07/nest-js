import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "./entities/permission.entity";
import { Repository } from "typeorm";

@Injectable()
export class PermissionService{
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
    ){}

    async createPermissions(name:string){
        const newPermission = await this.permissionRepository.create({name});
        await this.permissionRepository.save(newPermission);
        return newPermission;
    }
}