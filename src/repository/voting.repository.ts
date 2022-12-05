import { In } from 'typeorm';
import {
  Post,
  ERR_POST_NOT_FOUND,
  ERR_USER_NOT_FOUND,
  VoteType,
} from '../model';
import PostSchema from '../schema/post.schema';
import UserSchema from '../schema/user.schema';
import { dataSource } from './repository';

export class VotingRepository {
  private static readonly userRepo = dataSource.getRepository(UserSchema);
  private static readonly postRepo = dataSource.getRepository(PostSchema);

  static async handleVote(postId: number, userId: number, voteType: VoteType) {
    const [user, post] = await Promise.all([
      this.userRepo.findOne({
        where: {
          id: userId,
        },
        relations: ['upvote_posts', 'downvote_posts'],
      }),
      this.postRepo.findOne({
        where: {
          id: postId,
        },
      }),
    ]);
    if (user === null) throw ERR_USER_NOT_FOUND;
    if (post === null) throw ERR_POST_NOT_FOUND;
    if (voteType === VoteType.UPVOTE) {
      user.downvote_posts = user.downvote_posts?.filter(
        (e) => e.id !== post.id
      ); // remove post from downvote_posts if it exists
      user.upvote_posts?.push(post); // add post to upvote_posts if it doesn't exist
      return await this.userRepo.save(user);
    } else {
      user.upvote_posts = user.upvote_posts?.filter((e) => e.id !== post.id); // remove post from upvote_posts if it exists
      user.downvote_posts?.push(post); // add post to downvote_posts if it doesn't exist
      return await this.userRepo.save(user);
    }
  }

  static async upvotePost(userId: number, postId: number) {
    return await this.handleVote(postId, userId, VoteType.UPVOTE);
  }

  static async downvotePost(userId: number, postId: number) {
    return await this.handleVote(postId, userId, VoteType.DOWNVOTE);
  }

  static async unvotePost(userId: number, postId: number) {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
      },
      relations: ['upvote_posts', 'downvote_posts'],
    });
    if (user == null) throw ERR_USER_NOT_FOUND;
    let post = user.upvote_posts?.find((e) => e.id === postId);
    if (post != null) {
      user.upvote_posts = user.upvote_posts?.filter((e) => e.id !== postId);
      return await this.userRepo.save(user);
    }
    post = user.downvote_posts?.find((e) => e.id === postId);
    if (post != null) {
      user.downvote_posts = user.downvote_posts?.filter((e) => e.id !== postId);
      return await this.userRepo.save(user);
    }
  }

  static async getVoteCount(postId: number): Promise<Post> {
    const post = await this.postRepo.findOne({
      where: {
        id: postId,
      },
      relations: ['upvote_users', 'downvote_users'],
    });
    if (post == null) throw ERR_POST_NOT_FOUND;
    return {
      upvote: post.upvote_users?.length ?? 0,
      downvote: post.downvote_users?.length ?? 0,
    };
  }

  static async getVoteCounts(postIds: number[]): Promise<Post[]> {
    const postVotes = await this.postRepo.find({
      select: {
        id: true,
        upvote_users: true,
        downvote_users: true,
      },
      where: {
        id: In(postIds),
      },
      relations: ['upvote_users', 'downvote_users'],
    });
    return postIds.map((id) => {
      const post = postVotes.find((e) => e.id === id);
      if (post == null) throw ERR_POST_NOT_FOUND;
      return {
        upvote: post.upvote_users?.length ?? 0,
        downvote: post.downvote_users?.length ?? 0,
        id: post.id,
      };
    });
  }

  static async getVoteStatus(userId: number, postId: number) {
    const [user, post] = await Promise.all([
      this.userRepo.findOne({
        where: {
          id: userId,
        },
        relations: ['upvote_posts', 'downvote_posts'],
      }),
      this.postRepo.findOne({
        where: {
          id: postId,
        },
      }),
    ]);
    if (user == null) throw ERR_USER_NOT_FOUND;
    if (post == null) throw ERR_POST_NOT_FOUND;
    return {
      upvote: user.upvote_posts?.some((e) => e.id === post.id) ?? false,
      downvote: user.downvote_posts?.some((e) => e.id === post.id) ?? false,
    };
  }

  static async getUserVoting(userId: number) {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
      },
      relations: ['upvote_posts', 'downvote_posts'],
    });
    if (user === null) throw ERR_USER_NOT_FOUND;
    return [
      ...(user.upvote_posts?.map((e) => {
        return {
          id: e.id!,
          upvote: 1,
          downvote: 0,
        };
      }) ?? []),
      ...(user.downvote_posts?.map((e) => {
        return {
          id: e.id!,
          upvote: 0,
          downvote: 1,
        };
      }) ?? []),
    ];
  }
}
