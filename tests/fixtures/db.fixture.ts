import { getManager } from 'typeorm'
import bcrypt from 'bcrypt'
import { nanoid } from 'nanoid'

export async function seeDb() {
    const manager = getManager()

    const hashedPassword = await bcrypt.hash('password', 10)

    await manager.query(
        'INSERT INTO "user" ( "id", "firstName", "lastName", "password", email, "dateJoined" ) VALUES  (?, ?, ?, ?, ?, ? ), (?, ?, ?, ?, ?, ?)',
        [
            '1b038969-b3ca-4381-952a-f583432b61c3',
            'Sample',
            'User',
            hashedPassword,
            'sampleuser@email.com',
            new Date(),
            '91585552-d42a-42ba-ac45-ee25d4e59dcd',
            'Sample',
            'User',
            hashedPassword,
            'sampleuser2@email.com',
            new Date(),
        ]
    )

    const bookingId = "2VDOO2BDQA24"

    await manager.query('INSERT INTO "booking" ("orderId", "description", "start", "end", "amount") VALUES (?, ?, ?, ?, ? )', [
        bookingId,
        "Seed description",
        "2022-08-07T11:44:46.000Z",
        "2022-08-08T11:44:46.000Z",
        3000
    ])

    await manager.query('INSERT INTO "user_booking" ("id", "bookingId", "userId") VALUES (?, ?, ?)', [
        'e82dfe9f-334e-41d3-8106-d88abdf00c51',
        bookingId,
        '91585552-d42a-42ba-ac45-ee25d4e59dcd'
    ])
}

export async function clearDb() {
    const manager = getManager()
    await manager.query('DELETE FROM "user_booking"')
    await manager.query('DELETE FROM "user"')
    await manager.query('DELETE FROM "booking"')
}


