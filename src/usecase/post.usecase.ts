import { Post, POST_NOT_FOUND } from '../model';
import { PostRepository } from '../repository';

export class PostUseCase {
  private static readonly postRepo = PostRepository;

  static async findOne(id: number) {
    return await this.postRepo.findById(id);
  }

  static async createPost(post: Post) {
    return await this.postRepo.insertOne(post);
  }

  static async getSuggestionPosts({
    tags,
    limit,
    offset,
  }: {
    tags: number[];
    limit: number;
    offset: number;
  }) {
    return await this.postRepo.getSuggestionPosts({ tags, limit, offset });
  }

  static async getPostById(id: number) {
    const post = await this.postRepo.findById(id);
    if (post == null) throw POST_NOT_FOUND;
    return post;
  }
}
