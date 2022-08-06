import express from "express"
import request from "supertest"
import { init } from "../src/loaders"

describe('Booking tests', () => {
    const app = express()
    beforeAll(async () => {
        await init({ expressApp: app })
    })
    test('Create booking with one user that does not exist', async () => {
        const res = await request(app).post('/api/bookings').send({
            description: 'Sample description',
            amount: 5000,
            users: ["1b038569-b3ca-4381-952a-f583432b61c3"],
            start: "2022-08-07T11:44:46.000Z",
            end: "2022-08-08T11:44:46.000Z"
        })

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({
            status: 'failed',
        })
    })
    test('Create booking with one user', async () => {
        const res = await request(app).post('/api/bookings').send({
            description: 'Sample description',
            amount: 5000,
            users: ["1b038969-b3ca-4381-952a-f583432b61c3"],
            start: "2022-08-07T11:44:46.000Z",
            end: "2022-08-08T11:44:46.000Z"
        })

        expect(res.status).toBe(201)
        expect(res.body).toMatchObject({
            status: 'success',
            data: expect.objectContaining({
                booking: expect.objectContaining({
                    description: 'Sample description'
                })
            })

        })
    })

    test('Create booking with multiple users', async () => {
        const res = await request(app).post('/api/bookings').send({
            description: 'Sample description',
            amount: 5000,
            users: ["1b038969-b3ca-4381-952a-f583432b61c3", "91585552-d42a-42ba-ac45-ee25d4e59dcd"],
            start: "2022-08-07T11:44:46.000Z",
            end: "2022-08-08T11:44:46.000Z"
        })

        expect(res.status).toBe(201)
        expect(res.body).toMatchObject({
            status: 'success',
            data: expect.objectContaining({
                booking: expect.objectContaining({
                    description: 'Sample description'
                })
            })
        })
    })

    test('Get all bookings ', async () => {
        const res = await request(app).get('/api/bookings')

        expect(res.status).toBe(200)
        expect(res.body).toMatchObject({
            status: 'success',
            data: expect.objectContaining({
                bookings: expect.arrayContaining([expect.objectContaining({
                    description: "Sample description"
                })])
            })

        })
    })

    test('Get booking total amount', async () => {
        const res = await request(app).get('/api/bookings/2VDOO2BDQA24/total_amount')

        expect(res.status).toBe(200)
        expect(res.body).toMatchObject({
            status: 'success',
            data: expect.objectContaining({
                total_amount: 3000
            })
        })
    })

})