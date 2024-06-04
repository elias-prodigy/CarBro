import { Controller, Post, UseGuards, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Role } from './roles/roles.enum';
import { UserCreateDto } from "../user/dto/user.create.dto";
import { LocalAuthGuard } from "./guards/local.auth.guard";
import { UserDto } from "../user/dto/user.dto";
import { User } from "../user/decorator/user.decorator";
import { User as UserModel } from '../user/user.model';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@User() user: UserDto): Promise<{access_token: string}> {
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() createUserDto: UserCreateDto): Promise<UserModel> {
        return this.authService.register(createUserDto, Role.User);
    }
}
