import { Controller, Post, Param, UseGuards } from '@nestjs/common';

import { RentalService } from './rental.service';
import {RolesGuard} from "../auth/guards/roles.guard";
import {Roles} from "../auth/decorators/roles.decorator";
import {Role} from "../auth/roles/roles.enum";
import {User} from "../user/decorator/user.decorator";
import {UserDto} from "../user/dto/user.dto";
import {JwtAuthGuard} from "../auth/guards/jwt.auth.guard";
import {Rental} from "./rental.model";

@Controller('rental')
export class RentalController {
    constructor(private readonly rentalService: RentalService) {}

    @Roles(Role.Admin, Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post(':carId/rent')
    async rent(@Param('carId') carId: string, @User() user: UserDto): Promise<Rental> {
        return this.rentalService.rentCar(user, carId);
    }

    @Roles(Role.Admin, Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post(':rentalId/return')
    async return(@Param('rentalId') rentalId: string): Promise<Rental> {
        return this.rentalService.returnCar(rentalId);
    }
}