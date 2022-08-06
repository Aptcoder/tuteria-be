import express from 'express'
import userRouter from './user.routes'
import bookingRouter from './booking.routes'


const apiRouter = express.Router()

apiRouter.use('/users', userRouter)
apiRouter.use('/bookings', bookingRouter)

export default apiRouter
