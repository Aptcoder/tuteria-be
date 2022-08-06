import { IBookingRepository, IUserRepository } from '../utils/interfaces/repos.interfaces'

import { IBookingService, IUserService } from '../utils/interfaces/services.interfaces'
import { Service, Inject } from 'typedi'
import { IBooking, IUser } from '../utils/interfaces/entities.interfaces'
import { CreateBookingDto } from '../utils/dtos/booking.dto'
import { APIError, NotFoundError } from '../utils/errors'

@Service('booking_service')
export default class BookingService implements IBookingService {
    constructor(@Inject('booking_repository') public bookingRepository: IBookingRepository, @Inject('user_repository') public userRepository: IUserRepository) {
        this.bookingRepository = bookingRepository,
            this.userRepository = userRepository
    }

    async createBooking(createBookingDto: CreateBookingDto): Promise<IBooking> {
        const users = await this.userRepository.findByIds(createBookingDto.users as number[])
        if (users.length < 1) {
            throw new APIError("None of the users exist", 400)
        }

        const booking = await this.bookingRepository.create({
            ...createBookingDto,
            users: users,
        })

        return booking
    }

    async findAllBookings() {
        const bookings = await this.bookingRepository.findAll()
        return bookings
    }

    async findBookingById(orderId: string): Promise<IBooking> {
        const booking = await this.bookingRepository.findById(orderId)
        if (!booking) {
            throw new NotFoundError('Booking not found')
        }
        return booking
    }
}
