import { NextFunction, Request, Response } from 'express'
import { IBookingService, IUserService } from '../utils/interfaces/services.interfaces'
import { processError } from '../utils/helpers'
import { Inject, Service } from 'typedi'
import { CreateBookingDto } from 'src/utils/dtos/booking.dto'

@Service()
export class BookingController {

    constructor(@Inject('booking_service') public bookingService: IBookingService) {
        this.bookingService = bookingService
    }

    public async createBooking(req: Request, res: Response, next: NextFunction) {
        const createBookingDto: CreateBookingDto = req.body
        try {
            const booking = await this.bookingService.createBooking(createBookingDto)
            return res.status(201).send({
                message: 'Created booking',
                status: 'success',
                booking,
            })
        } catch (err: any) {
            return processError(res, err)
        }
    }

    public async getAllBookings(req: Request, res: Response, next: NextFunction) {
        try {
            const bookings = await this.bookingService.findAllBookings()
            return res.send({
                message: 'All bookings',
                status: 'success',
                bookings
            }
            )
        } catch (err: any) {
            return processError(res, err)
        }
    }

    public async getBooking(req: Request, res: Response, next: NextFunction) {
        try {
            const booking = await this.bookingService.findBookingById(req.params.orderId)
            return res.send({
                message: 'Booking',
                status: 'success',
                booking
            }
            )
        } catch (err: any) {
            return processError(res, err)
        }
    }
}
