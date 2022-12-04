import { User, ERR_USER_NOT_FOUND } from '../model';
import PostSchema from '../schema/post.schema';
import UserSchema from '../schema/user.schema';
import { dataSource } from './repository';

export class UserRepository {
  private static readonly repo = dataSource.getRepository(UserSchema);
  private static readonly postRepo = dataSource.getRepository(PostSchema);

  static async findById(id: number): Promise<User> {
    const user = await this.repo.findOne({
      where: {
        id,
      },
      relations: ['followers', 'followings'],
    });
    if (user == null) throw ERR_USER_NOT_FOUND;
    return user;
  }

  static async insertOne(user: User): Promise<User> {
    return await this.repo.save(user);
  }
}
