import { In } from 'typeorm';
import { Post } from '../model';
import PostSchema from '../schema/post.schema';
import { dataSource } from './repository';

export class PostRepository {
  private static readonly repo = dataSource.getRepository(PostSchema);

  static async findById(id: number) {
    return await this.repo.findOne({
      where: {
        id,
      },
      relations: ['author', 'tags'],
    });
  }

  static async insertOne(post: Post) {
    return await this.repo.save(post);
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
    const matchPostIds = (
      await this.repo.query(
        `select post_id from post_tag where tag_id = any ($1) 
      group by post_id order by count("tag_id") desc offset $2 limit $3`,
        [tags, offset, limit]
      )
    ).map((row: any) => row.post_id) as number[];

    return await this.repo.find({
      where: {
        id: In(matchPostIds),
      },
      relations: ['author', 'tags'],
    });
  }
}
