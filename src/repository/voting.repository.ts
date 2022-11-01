import { In } from 'typeorm';
import { Post, POST_NOT_FOUND, User, USER_NOT_FOUND, VoteType } from '../model';
import PostSchema from '../schema/post.schema';
import UserSchema from '../schema/user.schema';
import { dataSource } from './repository';

export class VotingRepository {
  private static readonly userRepo = dataSource.getRepository(UserSchema);
  private static readonly postRepo = dataSource.getRepository(PostSchema);

  static async handleVote(postId: number, userId: number, voteType: VoteType) {
        const [user, post] = await Promise.all([this.userRepo.findOne({
            where: {
                id: userId,
            },
            relations: ['upvote_posts', 'downvote_posts'],
        }),  this.postRepo.findOne({
            where: {
                id: postId,
            },
        })]);
        if (!user) throw USER_NOT_FOUND;
        if (!post) throw POST_NOT_FOUND;
        if (voteType === VoteType.UPVOTE) {
            user.downvote_posts = user.downvote_posts?.filter(e => e.id != post.id); // remove post from downvote_posts if it exists
            user.upvote_posts?.push(post); // add post to upvote_posts if it doesn't exist
            return this.userRepo.save(post)
        } else {
            user.upvote_posts = user.upvote_posts?.filter(e => e.id != post.id); // remove post from upvote_posts if it exists
            user.downvote_posts?.push(post); // add post to downvote_posts if it doesn't exist
            return this.userRepo.save(post)
        }
    }

    static async upvotePost(userId: number, postId: number) {
        return this.handleVote(postId, userId, VoteType.UPVOTE);
    }

    static async downvotePost(userId: number, postId: number) {
        return this.handleVote(postId, userId, VoteType.DOWNVOTE);
    }
    static async getVoteCount(postId: number) : Promise<Post> {
        const post = await this.postRepo.findOne({
            where: {
                id: postId,
            },
            relations: ['upvote_users', 'downvote_users'],
        });
        if (!post) throw POST_NOT_FOUND;
        return {
            upvote: post.upvote_users?.length || 0,
            downvote: post.downvote_users?.length || 0,
        };
    }
    static async getVoteCounts(postIds: number[]) : Promise<Post[]>{
        const postVotes = await this.postRepo.find({
            where: {
                id: In(postIds),
            },
            relations: ['upvote_users', 'downvote_users'],
        });
        return postVotes.map(post => ({
            upvote: post.upvote_users?.length || 0,
            downvote: post.downvote_users?.length || 0,
        }));
    }

    static async getVoteStatus(userId: number, postId: number) {
        const [user, post] = await Promise.all([this.userRepo.findOne({
            where: {
                id: userId,
            },
            relations: ['upvote_posts', 'downvote_posts'],
        }),  this.postRepo.findOne({
            where: {
                id: postId,
            },
        })]);
        if (!user) throw USER_NOT_FOUND;
        if (!post) throw POST_NOT_FOUND;
        return {
            upvote: user.upvote_posts?.some(e => e.id === post.id) || false,
            downvote: user.downvote_posts?.some(e => e.id === post.id) || false,
        };
    }
}
