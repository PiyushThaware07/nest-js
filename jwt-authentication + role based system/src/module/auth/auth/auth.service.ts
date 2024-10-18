import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthEntity)
        private readonly authRepository: Repository<AuthEntity>,
        private readonly jwtService: JwtService,
    ) { }

    async signup(payload: AuthEntity) {
        const { email } = payload;
        const existingUser = await this.authRepository.findOne({ where: { email: email } })
        if (existingUser) throw new ConflictException("Email already registered!")
        const newUser = this.authRepository.create(payload);
        const savedUser = await this.authRepository.save(newUser);
        const token = this.jwtService.sign({ id: savedUser.id });
        return { token, savedUser };
    }

    async signin(payload: any) {
        const { email } = payload;
        const existingUser = await this.authRepository.findOne({ where: { email: email } })
        if (!existingUser) throw new NotFoundException("Email not registered!");
        if (existingUser.password != payload.password) throw new HttpException("Invalid password", 400)
        const token = this.jwtService.sign({ id: existingUser.id });
        return { token, existingUser };
    }


    async validateById(id: string) {
        const user = await this.authRepository.findOne({ where: { id: id },relations:['roles','roles.permission'] })
        const roles = user.roles.map(role=>role.permission.map(permission=>console.log(permission.name)))
        if (!user) throw new NotFoundException("User not found!")
        return user;
    }


    async findAll(){
        return await this.authRepository.find();
    }
}