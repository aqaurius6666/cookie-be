import { Post, ERR_TAG_NOT_FOUND, User } from '../model';
import { PostRepository, TagRepository } from '../repository';
import { VotingRepository } from '../repository/voting.repository';

export class PostUseCase {
  private static readonly postRepo = PostRepository;
  private static readonly votingRepo = VotingRepository;
  private static readonly tagRepo = TagRepository;

  static async findOne(id: number): Promise<Post> {
    const post = await this.postRepo.findById(id);
    const voting = await this.votingRepo.getVoteCount(id); // get vote counts for post
    return { ...post, ...voting }; // merge vote counts with post
  }

  static async createPost(
    post: {
      title: string;
      content: string;
      isReceipe: boolean;
      tagIds: number[];
      cookTime: number;
    },
    userId: number
  ) {
    const tags = await this.tagRepo.findByIds(post.tagIds);
    if (tags?.length !== post.tagIds.length) throw ERR_TAG_NOT_FOUND;
    const sPost = new Post();
    sPost.title = post.title;
    sPost.content = post.content;
    // TODO: get author from token
    sPost.author = new User();
    sPost.author.id = userId;

    sPost.id = undefined;
    sPost.is_receipe = post.isReceipe;
    sPost.tags = tags;
    sPost.cook_time = post.cookTime;
    return await this.postRepo.insertOne(sPost);
  }

  static async updatePost(
    post: {
      id: number;
      title: string;
      content: string;
      isReceipe: boolean;
      tagIds: number[];
      cookTime: number;
    },
    userId: number
  ) {
    const sPost = await this.postRepo.findById(post.id);
    if (post.tagIds) {
      const tags = await this.tagRepo.findByIds(post.tagIds);
      if (tags?.length !== post.tagIds.length) throw ERR_TAG_NOT_FOUND;
      sPost.tags = tags;
    }
    sPost.title = post.title;
    sPost.content = post.content;
    // TODO: get author from token
    sPost.is_receipe = post.isReceipe;
    sPost.cook_time = post.cookTime;
    return await this.postRepo.update(sPost);
  }

  static async getSuggestionPosts({
    tags,
    limit,
    offset,
  }: {
    tags: number[];
    limit: number;
    offset: number;
  }): Promise<Post[]> {
    // append unknown tag
    const unknownTag = await this.tagRepo.findByName('unknown');
    tags = [...tags, unknownTag?.id ?? -1];
    const posts = await this.postRepo.getSuggestionPosts({
      tags,
    });
    const votings = await this.votingRepo.getVoteCounts(
      posts.map((e) => e.id ?? -1) // e always has id
    ); // get vote counts for each post
    return posts
      .map((post, index): Post => {
        return { ...post, ...votings[index] }; // merge vote counts with post
      })
      .sort((left, right) => (right.upvote ?? 0) - (left.upvote ?? 0))
      .slice(offset, offset + limit);
  }

  static async getPostById(id: number): Promise<Post> {
    const post = await this.postRepo.findById(id);
    const voting = await this.votingRepo.getVoteCount(id); // get vote counts for post
    return { ...post, ...voting }; // merge vote counts with post
  }

  static async listPosts(options: {
    offset: number;
    limit: number;
    userId?: number;
  }): Promise<Post[]> {
    const posts = await this.postRepo.selectPosts(options);
    const votings = await this.votingRepo.getVoteCounts(
      posts.map((e) => e.id ?? -1)
    );
    return posts.map((post, index): Post => {
      return { ...post, ...votings[index] };
    });
  }

  static async countPosts(options: { userId?: number }): Promise<number> {
    const total = await this.postRepo.count(options);
    return total;
  }
}
