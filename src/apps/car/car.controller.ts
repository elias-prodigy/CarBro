import {Controller, Post, Delete, Param, Body, Get, UseGuards, Query, Patch} from '@nestjs/common';

import { CarService } from './car.service';
import {RolesGuard} from "../auth/guards/roles.guard";
import {Roles} from "../auth/decorators/roles.decorator";
import {Role} from "../auth/roles/roles.enum";
import {CarCreateDto} from "./dto/car.create.dto";
import {JwtAuthGuard} from "../auth/guards/jwt.auth.guard";
import {Car} from "./car.model";
import {CarFindOptionsDto} from "./dto/car.find.options.dto";
import {CarUpdateLocationDto} from "./dto/car.update.location.dto";
import {CarSearchByLocationDto} from "./dto/car.search.by.location.dto";
import {User} from "../user/decorator/user.decorator";
import {UserDto} from "../user/dto/user.dto";

@Controller('car')
export class CarController {
    constructor(private readonly carService: CarService) {}

    @Roles(Role.Admin, Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async findAll(@Query() filters: CarFindOptionsDto): Promise<Car[]> {
        return this.carService.findAll(filters);
    }

    @Roles(Role.Admin, Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/:id')
    async findOne(@Param('id') id: string): Promise<Car> {
        return this.carService.findOne({id});
    }

    @Roles(Role.Admin, Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('available')
    async findAllAvailable(): Promise<Car[]> {
        return this.carService.findAll({isRented: false});
    }

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('rented')
    async findAllRented(): Promise<Car[]> {
        return this.carService.findAll({isRented: true});
    }

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async create(@Body() createCarDto: CarCreateDto) {
        return this.carService.create(createCarDto);
    }

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async delete(@Param('id') id: string, @User() user: UserDto) {
        if (user.id === id) {
            throw new Error(`User can't self delete`);
        }
        return this.carService.delete(id);
    }

    @Roles(Role.Admin, Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('/:id/location')
    async updateLocation(@Param("id") id: string, @Body() body: CarUpdateLocationDto) {
        return this.carService.updateLocation(id, body);
    }

    @Roles(Role.Admin, Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('location')
    async findByLocation(@Query() data: CarSearchByLocationDto) {
        return this.carService.findByLocation(data);
    }
}