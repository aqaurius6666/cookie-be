import { Post } from '../model';
import PostSchema from '../schema/post.schema';
import { dataSource } from './repository';

export class PostRepository {
  private static readonly repo = dataSource.getRepository(PostSchema);

  static async findById(id: number) {
    return await this.repo.findOne({
      where: {
        id,
      },
      relations: ['author', 'tags'],
    });
  }

  static async insertOne(post: Post) {
    return await this.repo.save(post);
  }
}
