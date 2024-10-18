import { Permission } from 'src/module/permission/entities/permission.entity';
import { User } from 'src/module/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity("role")
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => User, (user) => user.roles)
    users: User[];

    @ManyToMany(() => Permission, (permission) => permission.roles)
    @JoinTable()
    permissions: Permission[];
}
