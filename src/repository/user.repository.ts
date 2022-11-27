import { User, ERR_USER_NOT_FOUND, ERR_POST_NOT_FOUND, Post } from '../model';
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

  static async bookmarkPost(userId: number, postId: number): Promise<void> {
    const [user, post] = await Promise.all([
      this.repo.findOne({
        where: {
          id: userId,
        },
        relations: ['bookmark_posts'],
      }),
      this.postRepo.findOne({
        where: {
          id: postId,
        },
      }),
    ]);
    if (user == null) throw ERR_USER_NOT_FOUND;
    if (post == null) throw ERR_POST_NOT_FOUND;

    if (user.bookmark_posts == null) user.bookmark_posts = [];

    if (user.bookmark_posts.findIndex((p) => p.id === post.id) === -1) {
      user.bookmark_posts.push(post);
      await this.repo.save(user);
    }
  }

  static async getBookmarkPosts(userId: number): Promise<Post[]> {
    const user = await this.repo.findOne({
      where: {
        id: userId,
      },
      relations: ['bookmark_posts'],
    });
    if (user == null) throw ERR_USER_NOT_FOUND;
    return user.bookmark_posts ?? [];
  }

  static async deleteBookmarkPost(
    userId: number,
    postId: number
  ): Promise<void> {
    const user = await this.repo.findOne({
      where: {
        id: userId,
      },
      relations: ['bookmark_posts'],
    });
    if (user == null) throw ERR_USER_NOT_FOUND;
    if (user.bookmark_posts == null) return;

    const index = user.bookmark_posts.findIndex((p) => p.id === postId);
    if (index !== -1) {
      user.bookmark_posts.splice(index, 1);
      await this.repo.save(user);
    }
  }
}
