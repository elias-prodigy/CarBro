import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Role } from './roles/roles.enum';
import { CreateUserDto } from "../user/dto/create.user.dto";
import { LocalAuthGuard } from "./guards/local.auth.guard";
import { UserDto } from "../user/dto/user.dto";
import { User } from "../user/decorator/user.decorator";
import { JwtAuthGuard } from "./guards/jwt.auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@User() user: UserDto) {
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto, Role.User);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Request() req) {
        const token = req.headers.authorization.split(' ')[1];
        await this.authService.logout(token);
        return { message: 'Logged out successfully' };
    }
}
