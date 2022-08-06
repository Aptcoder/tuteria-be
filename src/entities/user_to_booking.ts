import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm"
import Booking from "./booking.entity"
import User from "./user.entity"

@Unique(["bookingId", "userId"])
@Entity({ name: 'user_booking' })
export class UserBooking {
    @PrimaryGeneratedColumn('uuid')
    public id!: number

    @Column()
    public userId!: number

    @Column()
    public bookingId!: string

    @ManyToOne(() => User, (user) => user.userBookings)
    public user!: User

    @ManyToOne(() => Booking, (booking) => booking.userBookings)
    public booking!: Booking
}