import {
    Column, Entity, BaseEntity, Unique, OneToMany, PrimaryColumn, ManyToMany, JoinTable
} from 'typeorm';
import { nanoid } from 'nanoid'
import { UserBooking } from './user_to_booking';
import User from './user.entity';


@Entity()
export default class Booking extends BaseEntity {

    @PrimaryColumn({
        type: 'varchar',
        nullable: false,
        unique: true,
    })
    orderId!: string

    @Column({
        type: 'varchar',
        nullable: false
    })
    description!: string;

    @Column({
        type: 'datetime',
        nullable: false,
    })
    start!: string;

    @Column({
        type: 'datetime',
        nullable: false,
    })
    end!: string;

    @Column({
        type: 'numeric',
        precision: 20,
        scale: 4,
        default: 0,
        nullable: false,
        transformer: {
            to: (value) => value,
            from: (value): number => parseFloat(value)
        }
    })
    amount!: number;

    @OneToMany(() => UserBooking, userBooking => userBooking.booking)
    public userBookings!: UserBooking[];

    @ManyToMany(() => User)
    @JoinTable({
        name: 'user_booking',
        joinColumn: {
            name: 'bookingId',
            referencedColumnName: 'orderId',
        },
        inverseJoinColumn: {
            name: 'userId',
            referencedColumnName: 'id',
        },
    })
    users!: User[]




}
