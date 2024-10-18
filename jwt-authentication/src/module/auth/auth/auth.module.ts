import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './entities/auth.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CustomJwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([AuthEntity]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: "private_key",
            signOptions: { expiresIn: "30h" }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService,CustomJwtStrategy],
})
export class AuthModule { };