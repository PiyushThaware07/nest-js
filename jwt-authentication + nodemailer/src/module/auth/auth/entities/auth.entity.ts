import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';

@Entity()
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
}
