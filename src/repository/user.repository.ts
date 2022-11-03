import { User, USER_NOT_FOUND } from '../model';
import UserSchema from '../schema/user.schema';
import { dataSource } from './repository';

export class UserRepository {
  private static readonly repo = dataSource.getRepository(UserSchema);

  static async findById(id: number) {
    const user = await this.repo.findOne({
      where: {
        id,
      },
      relations: ['followers', 'followings'],
    });
    if (user == null) throw USER_NOT_FOUND;
  }

  static async insertOne(user: User) {
    return await this.repo.save(user);
  }
}
