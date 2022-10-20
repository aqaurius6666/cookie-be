const { UserRepository } = require("../repository")

module.exports = class userUsecase {

    static userRepo = UserRepository;

    static findOne(id) {
        return this.userRepo.findOneBy({
            id: id
        });
    }
}