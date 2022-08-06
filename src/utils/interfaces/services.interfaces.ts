/* eslint-disable no-unused-vars */

import { CreateBookingDto } from "../dtos/booking.dto"
import { CreateUserDto } from "../dtos/users.dto"
import { IBooking, IUser } from "./entities.interfaces"

export interface IUserService {
    createUser(createUserDto: CreateUserDto): Promise<IUser>
    getUsers(): Promise<IUser[]>
}

export interface IBookingService {
    createBooking(createBookingDto: CreateBookingDto): Promise<IBooking>
    findAllBookings(): Promise<IBooking[]>
    findBookingById(orderId: string): Promise<IBooking>
}