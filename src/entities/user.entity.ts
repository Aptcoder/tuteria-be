import {
  Column, Entity, OneToOne, PrimaryGeneratedColumn, BaseEntity, ManyToMany, JoinTable, OneToMany, PrimaryColumn
} from 'typeorm';
import Booking from './booking.entity';
import { UserBooking } from './user_to_booking';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column({
    type: 'varchar',
    nullable: false
  })
  firstName!: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  lastName!: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  password!: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    transformer: {
      to: (value: string) => value.toLowerCase(),
      from: (value) => value
    }
  })
  email!: string;

  @Column({
    type: 'datetime',
    default: () => "CURRENT_TIMESTAMP",
  })
  dateJoined!: string;

  @OneToMany(() => UserBooking, userBooking => userBooking.user)
  public userBookings!: UserBooking[];

  @ManyToMany(() => Booking)
  bookings!: Booking[]

}
