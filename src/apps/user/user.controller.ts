import { Controller, Get, Param, Delete, Body, Post, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { UserCreateDto } from "./dto/user.create.dto";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne({id});
    }

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }

    @Roles(Role.SuperAdmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('admin/create')
    createAdmin(@Body() createUserDto: UserCreateDto) {
        return this.userService.create(createUserDto, Role.Admin);
    }
}
