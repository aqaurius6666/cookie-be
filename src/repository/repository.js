const {DataSource} = require('typeorm')

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'cleango',
    password: 'cleango',
    database: 'cleango',
    synchronize: true,
    logging: false,
    entities: [
        __dirname + '/model/*.model.js'
    ]
})

// source.initialize().then(async connection => {
//     console.log("Connected to database")
// }).catch(error => console.log(error))

export const connectDB = async () => {
    return dataSource.initialize()
}
