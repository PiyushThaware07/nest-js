import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToMany } from 'typeorm';
import { AuthEntity } from '../../auth/entities/auth.entity';
import { PermissionEntity } from '../../permission/entities/permission.entity';

@Entity("role")
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: string;
    @BeforeInsert()
    generateId() {
        this.id = new Date().toString()
    }

    @Column({ nullable: true })
    name?: string;

    @ManyToMany(() => AuthEntity, user => user.roles)
    users: AuthEntity;

    @ManyToMany(()=>PermissionEntity,permission=>permission.role,{eager:true})
    permission : PermissionEntity[];
}
