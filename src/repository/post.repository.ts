import { Post, ERR_POST_NOT_FOUND, Score } from '../model';
import PostSchema from '../schema/post.schema';
import { dataSource } from './repository';

export class PostRepository {
  private static readonly repo = dataSource.getRepository(PostSchema);

  static async findById(id: number) {
    const post = await this.repo.findOne({
      where: {
        id,
      },
      relations: ['author', 'tags', 'tags.questions'],
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

  static async getSuggestionPosts({
    tags,
  }: {
    tags: number[];
  }): Promise<Array<Post & Score>> {
    const posts = this.repo
      .createQueryBuilder('post')
      .select('*')
      .innerJoin(
        (db) => {
          return db
            .select('post_id, count("tag_id") as score')
            .from('post_tag', 'post_tag')
            .where('tag_id = any (:tags)', { tags })
            .groupBy('post_id');
        },
        'score',
        'score.post_id = post.id'
      )
      .orderBy('score.score', 'DESC')
      .loadAllRelationIds({
        relations: ['tags', 'author'],
      });
    return await posts.execute();
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
    return await this.repo.find({
      where: whereClause,
      relations: ['author', 'tags', 'tags.questions'],
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
