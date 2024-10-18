import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class CustomJwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "private_key"
        })
    }

    async validate(payload: any) {
        console.log("validate payload : ",payload);
        const { id } = payload;
        const user = await this.authService.validateById(id);
        return user;
    }
}