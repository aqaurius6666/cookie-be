const UserSchema = require('../schema/user.schema');
const { dataSource } = require('./repository');

const repository = dataSource.getRepository(UserSchema);

module.exports = repository;
