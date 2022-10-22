const { UserRepository } = require('../repository');

class UserUsecase {
  static #userRepo = UserRepository;

  static findOne(id) {
    return this.#userRepo.findById(id);
  }
};

module.exports = UserUsecase;
