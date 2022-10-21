const { User } = require('../model');
const { dataSource } = require('./repository');

class UserRepository {
    static #repo = dataSource.getRepository(User)

    static findById(id) {
        return this.#repo.findOneBy({
            id,
        });
    }
}

module.exports = UserRepository;
