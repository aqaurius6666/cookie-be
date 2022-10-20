module.exports = {
    ConnectDatabase: require('./repository').connectDB,
    UserRepository : require('./user.repository'),
}