const { connectDB } = require('./repository/repository')
const server = require('./route/server')


const main = async () => {
    await connectDB()
    console.log("connect db success")
    server.listen(3000, () => {
        console.log('Server is running on port 3000')
    })
}

module.exports = main;