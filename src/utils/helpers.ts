/* eslint-disable import/prefer-default-export */
import { Response } from 'express'


export const processError = (res: Response, error: any) => {
    console.log('et', error)
    if (error.status) {
        return res.status(error.status).send({
            status: 'failed',
            message: error.message,
            data: {},
        })
    }
    return res.status(500).send({
        status: 'failed',
        message: error.message,
        data: {},
    })
}

