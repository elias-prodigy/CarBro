import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Role } from './roles/roles.enum';
import { UserCreateDto } from "../user/dto/user.create.dto";
import { LocalAuthGuard } from "./guards/local.auth.guard";
import { UserDto } from "../user/dto/user.dto";
import { User } from "../user/decorator/user.decorator";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@User() user: UserDto) {
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() createUserDto: UserCreateDto) {
        return this.authService.register(createUserDto, Role.User);
    }
}
