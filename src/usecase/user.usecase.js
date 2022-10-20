const { UserRepository } = require('../repository');

module.exports = class UserUsecase {
  static userRepo = UserRepository;

  static findOne(id) {
    return this.userRepo.findOneBy({
      id: id,
    });
  }
};
