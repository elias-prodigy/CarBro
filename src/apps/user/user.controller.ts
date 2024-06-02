import { Controller, Get, Param, Delete, Body, Post, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { CreateUserDto } from "./dto/create.user.dto";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.SuperAdmin)
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.SuperAdmin)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOneBy({id});
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.userService.remove(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.SuperAdmin)
    @Post('admin/create')
    createAdmin(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto, Role.Admin);
    }
}
