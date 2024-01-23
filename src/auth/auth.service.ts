import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(username: string, password: string): Promise<any> {
        // find the user based on the username and store it in user variable
        const user = await this.usersService.findOne(username);

        // check if we have the user AND user's password matches the password provided
        if (user && user.password === password) {
            const { password, username, ...rest} = user;
            return rest;
        }

        return null;
    }
}
