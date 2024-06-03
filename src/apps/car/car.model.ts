import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, OneToMany
} from 'typeorm';
import {User} from "../user/user.model";
import {Rental} from "../rental/rental.model";

@Entity()
export class Car {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    brand: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column({ default: false })
    isRented: boolean;

    @OneToMany(() => Rental, rental => rental.user)
    rentals: Rental[];

    @Column('decimal', { precision: 10, scale: 6, nullable: true })
    latitude: number;

    @Column('decimal', { precision: 10, scale: 6, nullable: true })
    longitude: number;

    @CreateDateColumn({ nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ nullable: false })
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;
}