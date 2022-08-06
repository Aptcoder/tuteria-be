import { createConnection, Connection } from 'typeorm'
import config from 'config'
import path from 'path'

const entityPath = path.resolve(__dirname, '..', 'entities')

export default (): Promise<void | Connection> => createConnection({
    type: 'sqlite',
    database: config.get<string>('database'),
    entities: [`${entityPath}/*.{js,ts}`],
    logging: false
})
    .then((connection) => {
        if (process.env.NODE_ENV != "test") {
            console.log('Sucessfully connected to db')
        }
    })
    .catch((err) => {
        console.log('Could not connect to db', err)
        process.exit(1)
    })
