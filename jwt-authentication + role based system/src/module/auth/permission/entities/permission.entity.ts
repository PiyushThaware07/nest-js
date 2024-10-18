import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToMany, JoinTable } from 'typeorm';
import { RoleEntity } from '../../role/entities/role.entity';


@Entity("permission")
export class PermissionEntity {
    @PrimaryGeneratedColumn()
    id: string;
    @BeforeInsert()
    generateId() {
        this.id = new Date().toString()
    }

    @Column({ nullable: true })
    name?: string;

    @ManyToMany(()=>RoleEntity,role=>role.permission)
    @JoinTable()
    role : RoleEntity[];
}
