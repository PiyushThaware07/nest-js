import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { Role } from "../role/entities/role.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) { }

    async createUser(name: string, email: string): Promise<User> {
        const user = this.userRepository.create({ name, email });
        return this.userRepository.save(user);
    }

    async assignRole(userId: number, roleId: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['roles'] });
        const role = await this.roleRepository.findOne({ where: { id: roleId } });
        user.roles.push(role);
        return this.userRepository.save(user);
    }


    async findUserWithRoles(userId: number): Promise<User> {
        const result = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['roles', 'roles.permissions'],
        });

        const permissions = result.roles.reduce((acc, role) => {
            const rolePermissions = role.permissions.map(permission => permission.name);
            return acc.concat(rolePermissions);
        }, []);

        console.log("User Details: ", result);
        console.log("Mapped Permissions: ", permissions);
        return result
    }
}