import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // provide config for jwt strategy
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'SECRET' // use .env file variable!
        })
    }

    async validate(payload: any) {
        // const user = await this.usersService.getById(payload.sub);
        return { id: payload.sub, name: payload.name };
        // return ...user;
    }
}