import Joi from 'joi'
const createBookingBodySchema = Joi.object().keys({
    users: Joi.array().items(Joi.string().uuid()),
    description: Joi.string().required(),
    start: Joi.date().iso().required(),
    end: Joi.date().iso().greater(Joi.ref('start')).required(),
    amount: Joi.number().required()
})

const getBookingParamsSchema = Joi.object().keys({
    orderId: Joi.string().required()
})

export { createBookingBodySchema, getBookingParamsSchema }
