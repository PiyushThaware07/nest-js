import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./entities/role.entity";
import { Repository } from "typeorm";

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) { }


    async createRole(payload: any) {
        const newRole = this.roleRepository.create({ name: payload.name });
        const savedRole = await this.roleRepository.save(newRole);
        return savedRole;
    }

    async assignPermissions(roleId: number, payload: any){
        const { permissionIds } = payload;
        const role = await this.roleRepository.findOne({where:{id:roleId},relations:['permissions']})
        role.permissions = permissionIds.map((id)=>({id} as any));
        return this.roleRepository.save(role);
    }
}