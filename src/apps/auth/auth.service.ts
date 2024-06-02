import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import {UserService} from '../user/user.service';
import {CreateUserDto} from "../user/dto/create.user.dto";
import {Role} from "./roles/roles.enum";
import {UserDto} from "../user/dto/user.dto";

@Injectable()
export class AuthService {
    //Keeping black listed tokens in memory is not a production ready solution.
    //We should use Redis instead.
    //But since the logout function wasn't described in the task list
    //I would go further with this solution
    private blacklistedTokens: Set<string> = new Set();

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOneBy({email});
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: UserDto) {
        const payload = { email: user.email, id: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(createUserDto: CreateUserDto, role: Role) {
        return this.userService.create(createUserDto, role);
    }

    async logout(token: string): Promise<void> {
        this.blacklistedTokens.add(token);
    }

    isTokenBlacklisted(token: string): boolean {
        return this.blacklistedTokens.has(token);
    }
}
