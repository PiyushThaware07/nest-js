import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "./entities/role.entity";
import { Repository } from "typeorm";
import { AuthEntity } from "../auth/entities/auth.entity";

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
        @InjectRepository(AuthEntity)
        private readonly authRepository: Repository<AuthEntity>,
    ) { }

    async findAll() {
        return await this.roleRepository.find();
    }

    async create(payload: any) {
        const existingRole = await this.roleRepository.findOne({ where: { name: payload.name } });
        if (existingRole) throw new ConflictException("role already exists");
        const newRole = this.roleRepository.create(payload);
        return await this.roleRepository.save(newRole);
    }


    async assignPermission(roleId: string, payload: any[]) {
        const role = await this.roleRepository.findOne({ where: { id: roleId } });
        if (!role) throw new ConflictException("role not found");
        role.permission = payload.map((id) => ({ id } as any));
        return await this.roleRepository.save(role);
    }

    async assignRole(userId: string, roleId: string) {
        const user = await this.authRepository.findOne({ where: { id: userId } });
        const role = await this.roleRepository.findOne({ where: { id: roleId } });
        user.roles.push(role)
        return await this.authRepository.save(user);
    }
}