import { User } from '../model';
import { UserRepository } from '../repository';

export class UserUsecase {
  private static readonly userRepo = UserRepository;

  static async findOne(id: number) {
    return await this.userRepo.findById(id);
  }

  static async createUser(user: User) {
    return await this.userRepo.insertOne(user);
  }
}
