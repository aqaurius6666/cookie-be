import { Post, POST_NOT_FOUND } from '../model';
import { PostRepository } from '../repository';
import { VotingRepository } from '../repository/voting.repository';

export class PostUseCase {
  private static readonly postRepo = PostRepository;
  private static readonly votingRepo  = VotingRepository;

  static async findOne(id: number) : Promise<Post> {
    const post = await this.postRepo.findById(id);
    const voting = await this.votingRepo.getVoteCount(id); // get vote counts for post
    return { ...post, ...voting }; // merge vote counts with post
    
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
    const posts = await this.postRepo.getSuggestionPosts({ tags, limit, offset });
    const votings = await this.votingRepo.getVoteCounts(posts.map(e => e.id!)); // get vote counts for each post
    return posts.map((post, index) => ({ ...post, ...votings[index] } as Post )); // merge vote counts with post
  }

  static async getPostById(id: number) {
    const post = await this.postRepo.findById(id);
    const voting = await this.votingRepo.getVoteCount(id); // get vote counts for post
    return { ...post, ...voting } as Post; // merge vote counts with post
  }
}
