import { Router } from 'express'
import Container from 'typedi'
import { createBookingBodySchema, getBookingParamsSchema } from '../../schemas/booking.schema'
import validateRequest from '../../middlewares/validator'
import { BookingController } from '../../controllers/booking.controller'
import BookingRepository from '../../repositories/booking.repository'
import BookingService from '../../services/booking.service'

const bookingRouter: Router = Router()

Container.set({ id: 'booking_repository', type: BookingRepository })
Container.set({ id: 'booking_service', type: BookingService })
const bookingController = Container.get(BookingController)

bookingRouter.get('/',
    bookingController.getAllBookings.bind(bookingController))

bookingRouter.post('/', validateRequest(createBookingBodySchema),
    bookingController.createBooking.bind(bookingController))

bookingRouter.get('/:orderId', validateRequest(null, getBookingParamsSchema),
    bookingController.getBooking.bind(bookingController))

bookingRouter.get('/:orderId/total_amount', validateRequest(null, getBookingParamsSchema),
    bookingController.getBookingTotalAmount.bind(bookingController))
export default bookingRouter
