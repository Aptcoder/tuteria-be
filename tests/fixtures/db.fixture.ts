import { getManager } from 'typeorm'
import bcrypt from 'bcrypt'

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
}

export async function clearDb() {
    const manager = getManager()
    await manager.query('DELETE FROM "user_booking"')
    await manager.query('DELETE FROM "user"')
}


