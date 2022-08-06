import { EntityManager } from 'typeorm'
import { BookingData, CreateBookingDto } from '../dtos/booking.dto'
import { CreateUserDto } from '../dtos/users.dto'
import { IBooking, IUser } from './entities.interfaces'

export interface IUserRepository {
    create(createUserDto: CreateUserDto): Promise<IUser>
    findAll(): Promise<IUser[]>
    findByIds(ids: number[]): Promise<IUser[]>
}

export interface IBookingRepository {
    create(bookingData: BookingData): Promise<IBooking>
    findAll(): Promise<IBooking[]>
    findById(orderId: string): Promise<IBooking | undefined>
}