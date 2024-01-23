import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy (Strategy) {
    constructor(private authService: AuthService) {
        super(); // pass in config
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);

        if (!user) {
            throw new UnauthorizedException();
        }

        // can return user as validateUser method used on line 13 already only returns an id and a name, so this user matches Promise<any> type
        return user;
    }
}