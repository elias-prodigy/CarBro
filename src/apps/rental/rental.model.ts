import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.model';
import { Car } from '../car/car.model';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.rentals)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Car, (car) => car.rentals)
  @JoinColumn({ name: 'carId' })
  car: Car;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;
}
