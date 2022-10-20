const { User } = require('../model');
const { dataSource } = require('./repository');

const repository = dataSource.getRepository(User);

module.exports = repository;
