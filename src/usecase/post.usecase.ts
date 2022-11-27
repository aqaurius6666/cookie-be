import logger from '../logger';
import {
  Post,
  ERR_TAG_NOT_FOUND,
  User,
  PostWithQuestions,
  Score,
} from '../model';
import {
  PostRepository,
  QuestionRepository,
  TagRepository,
  UserRepository,
  VotingRepository,
} from '../repository';

export class PostUseCase {
  private static readonly postRepo = PostRepository;
  private static readonly votingRepo = VotingRepository;
  private static readonly tagRepo = TagRepository;
  private static readonly questionRepo = QuestionRepository;
  private static readonly userRepo = UserRepository;

  static async findOne(id: number): Promise<Post> {
    const post = await this.postRepo.findById(id);
    const voting = await this.votingRepo.getVoteCount(id); // get vote counts for post
    return { ...post, ...voting }; // merge vote counts with post
  }

  static async getPostWithQuestionsById(
    id: number
  ): Promise<PostWithQuestions> {
    const post = await this.postRepo.findById(id);
    const voting = await this.votingRepo.getVoteCount(id);
    const tagIds = post?.tags?.map((e) => e.id!) ?? [];
    let questions = await this.questionRepo.findByTagIds(tagIds);
    questions = questions.map((question) => {
      return {
        ...question,
        tags: question?.tags?.filter((tag) => tagIds.includes(tag.id!)) ?? [],
      };
    });
    return { ...post, ...voting, questions };
  }

  static async createPost(
    post: {
      title: string;
      content: string;
      isReceipe: boolean;
      tagIds: number[];
      cookTime: number;
      thumbnail: string;
    },
    userId: number
  ) {
    const tags = await this.tagRepo.findByIds(post.tagIds);
    if (tags?.length !== post.tagIds.length) throw ERR_TAG_NOT_FOUND;
    const sPost = new Post();
    sPost.title = post.title;
    sPost.content = post.content;
    sPost.thumbnail = post.thumbnail;
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
      thumbnail: string;
    },
    userId: number
  ) {
    const sPost = await this.postRepo.findById(post.id);
    if (post.tagIds.length !== 0) {
      const tags = await this.tagRepo.findByIds(post.tagIds);
      console.log(tags);
      if (tags?.length !== post.tagIds.length) throw ERR_TAG_NOT_FOUND;
      sPost.tags = tags;
    }
    sPost.title = post.title;
    sPost.content = post.content;
    sPost.thumbnail = post.thumbnail;
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
      .map((post, index): Post & Score => {
        return { ...post, ...votings[index] }; // merge vote counts with post
      })
      .sort((left, right) => {
        if (left.score === right.score) {
          return (right.upvote ?? 0) - (left.upvote ?? 0);
        } else {
          return (right.score ?? 0) - (left.score ?? 0);
        }
      })
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
    logger.info(options);
    const posts = await this.postRepo.selectPosts({
      ...options,
      sortByLatest: true,
    });
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

  static async countPostsBookmark(dto: { userId: number }): Promise<number> {
    const total = await this.userRepo.getBookmarkPosts(dto.userId);
    return total.length;
  }

  static async listPostsBookmark(dto: {
    userId: number;
    offset: number;
    limit: number;
  }): Promise<Post[]> {
    const posts = await this.userRepo.getBookmarkPosts(dto.userId);
    const votings = await this.votingRepo.getVoteCounts(
      posts.map((e) => e.id ?? -1)
    );
    return posts.map((post, index): Post => {
      return { ...post, ...votings[index] };
    });
  }
}
