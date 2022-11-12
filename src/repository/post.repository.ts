import { In } from 'typeorm';
import { Post, ERR_POST_NOT_FOUND } from '../model';
import PostSchema from '../schema/post.schema';
import { dataSource } from './repository';

export class PostRepository {
  private static readonly repo = dataSource.getRepository(PostSchema);

  static async findById(id: number) {
    const post = await this.repo.findOne({
      where: {
        id,
      },
      relations: ['author', 'tags'],
    });
    if (post == null) throw ERR_POST_NOT_FOUND;
    return post;
  }

  static async insertOne(post: Post) {
    return await this.repo.save(post);
  }

  static async update(post: Post) {
    console.log(post);
    return await this.repo.save(post);
  }

  static async getSuggestionPosts({ tags }: { tags: number[] }) {
    const matchPostIds = (
      await this.repo.query(
        `select post_id from post_tag where tag_id = any ($1) 
      group by post_id order by count("tag_id") desc`,
        [tags]
      )
    ).map((row: any) => row.post_id) as number[];

    return await this.repo.find({
      where: {
        id: In(matchPostIds),
      },
      relations: ['author', 'tags'],
    });
  }

  static async selectPosts({
    offset,
    limit,
    userId,
    sortByLatest,
  }: {
    offset: number;
    limit: number;
    userId?: number;
    sortByLatest?: boolean;
  }): Promise<Post[]> {
    let whereClause = {};
    if (userId) {
      whereClause = {
        ...whereClause,
        author: {
          id: userId,
        },
      };
    }
    console.log(limit);
    return await this.repo.find({
      where: whereClause,
      relations: ['author', 'tags'],
      order: {
        created_at: sortByLatest ? 'DESC' : undefined,
      },
      skip: offset,
      take: limit,
    });
  }

  static async count(options: { userId?: number }): Promise<number> {
    let whereClause = {};
    if (options.userId) {
      whereClause = {
        ...whereClause,
        author: {
          id: options.userId,
        },
      };
    }
    return await this.repo.count({
      where: whereClause,
      relations: ['author'],
    });
  }
}
