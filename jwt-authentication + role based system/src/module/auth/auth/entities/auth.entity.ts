import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToMany, JoinTable } from 'typeorm';
import { RoleEntity } from '../../role/entities/role.entity';

@Entity("auth")
export class AuthEntity {
    @PrimaryGeneratedColumn()
    id: string;
    @BeforeInsert()
    generateId() {
        this.id = new Date().toString()
    }

    @Column({ nullable: true })
    fname?: string;

    @Column({ nullable: true })
    lname?: string;

    @Column({ unique: true, nullable: true })
    email?: string;

    @Column({ nullable: true })
    password?: string;

    @ManyToMany(() => RoleEntity, role => role.users,{eager:true})
    @JoinTable()
    roles: RoleEntity[]
}
