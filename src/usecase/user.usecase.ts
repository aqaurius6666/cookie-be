import { Post, User } from '../model';
import {
  BookmarkRepository,
  UserRepository,
  VotingRepository,
} from '../repository';

export class UserUsecase {
  private static readonly userRepo = UserRepository;
  private static readonly bookmarkRepo = BookmarkRepository;
  private static readonly votingRepo = VotingRepository;

  static async findOne(id: number): Promise<User> {
    return await this.userRepo.findById(id);
  }

  static async createUser(user: User): Promise<User> {
    return await this.userRepo.insertOne(user);
  }

  static async bookmarkPost(userId: number, postId: number): Promise<void> {
    return await this.bookmarkRepo.createBookmark(userId, postId);
  }

  static async getBookmarkPosts(userId: number): Promise<Post[]> {
    return await this.bookmarkRepo.getBookmarkPosts(userId);
  }

  static async deleteBookmarkPost(
    userId: number,
    postId: number
  ): Promise<void> {
    return await this.bookmarkRepo.deleteBookmark(userId, postId);
  }

  static async upvotePost(userId: number, postId: number): Promise<void> {
    await this.votingRepo.upvotePost(userId, postId);
    
  }

  static async downvotePost(userId: number, postId: number): Promise<void> {
    await this.votingRepo.downvotePost(userId, postId);
    
  }
}
