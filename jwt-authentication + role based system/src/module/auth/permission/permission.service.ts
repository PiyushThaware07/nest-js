import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PermissionEntity } from "./entities/permission.entity";
import { Repository } from "typeorm";

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(PermissionEntity)
        private readonly permissionRepository: Repository<PermissionEntity>,
    ){}

    async findAll(){
        return await this.permissionRepository.find();
    }

    async create(payload:any){
        const existingPermission = await this.permissionRepository.findOne({where:{name:payload.name}})
        if(existingPermission) throw new ConflictException("permission already exists");
        const newPermission = await this.permissionRepository.create(payload);
        return await this.permissionRepository.save(newPermission);
    }
}