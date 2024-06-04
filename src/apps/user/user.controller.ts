import {Controller, Get, Param, Delete, Body, Post, UseGuards, Query} from '@nestjs/common';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { UserCreateDto } from "./dto/user.create.dto";
import {FindUserOptions} from "./dto/user.find.options.dto";
import {User} from "./user.model";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    findAll(@Query() filters: FindUserOptions): Promise<User[]> {
        return this.userService.findAll(filters);
    }

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne({id});
    }

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.userService.remove(id);
    }

    @Roles(Role.SuperAdmin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('admin/create')
    createAdmin(@Body() createUserDto: UserCreateDto): Promise<User> {
        return this.userService.create(createUserDto, Role.Admin);
    }
}
