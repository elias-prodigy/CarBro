import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import {UserService} from '../user/user.service';
import {UserCreateDto} from "../user/dto/user.create.dto";
import {Role} from "./roles/roles.enum";
import {UserDto} from "../user/dto/user.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOne({email});
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

    async register(createUserDto: UserCreateDto, role: Role) {
        return this.userService.create(createUserDto, role);
    }
}
