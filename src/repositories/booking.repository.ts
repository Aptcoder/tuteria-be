import { nanoid } from 'nanoid';
import { IBooking } from 'src/utils/interfaces/entities.interfaces';
import Booking from '../entities/booking.entity';
import { BookingData, CreateBookingDto } from '../utils/dtos/booking.dto';
import { IBookingRepository, IUserRepository } from '../utils/interfaces/repos.interfaces';

export default class BookingRepository implements IBookingRepository {

    async create(bookingData: BookingData) {
        const booking = Booking.create({
            ...bookingData,
            orderId: nanoid(12)
        })

        return booking.save()
    }

    test = 'Hi there'

    async findAll(): Promise<IBooking[]> {
        const bookings = await Booking.find({})
        return bookings
    }

    async findById(orderId: string): Promise<IBooking | undefined> {
        console.log('here', orderId)
        const booking = await Booking.findOne({
            where: { orderId: orderId },
            relations: ['users']
        })
        return booking
    }
}
