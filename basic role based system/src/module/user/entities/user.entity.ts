import { Role } from 'src/module/role/entities/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable()
    roles: Role[];
}
