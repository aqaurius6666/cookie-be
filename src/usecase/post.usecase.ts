import { Post } from '../model';
import { PostRepository } from '../repository';

export class PostUseCase {
  private static readonly postRepo = PostRepository;

  static async findOne(id: number) {
    return await this.postRepo.findById(id);
  }

  static async createPost(post: Post) {
    return await this.postRepo.insertOne(post);
  }
}
