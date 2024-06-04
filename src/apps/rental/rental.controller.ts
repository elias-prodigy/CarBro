import {
  Controller,
  Post,
  Param,
  UseGuards,
  Body,
  Patch,
} from '@nestjs/common';

import { RentalService } from './rental.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles/roles.enum';
import { User } from '../user/decorator/user.decorator';
import { UserDto } from '../user/dto/user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { Rental } from './rental.model';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('rent')
  async rent(
    @Body() body: { carId: string },
    @User() user: UserDto,
  ): Promise<Rental> {
    return this.rentalService.rent(user, body.carId);
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':rentalId/return')
  async return(@Param('rentalId') rentalId: string): Promise<Rental> {
    return this.rentalService.return(rentalId);
  }
}
