import { In } from 'typeorm';
import TagSchema from '../schema/tag.schema';
import { dataSource } from './repository';

export class TagRepository {
  private static readonly repo = dataSource.getRepository(TagSchema);

  static async findByIds(ids: number[]) {
    return await this.repo.find({
      where: {
        id: In(ids),
      },
    });
  }

  static async findByName(name: string) {
    return await this.repo.findOne({
      where: {
        name,
      },
    });
  }
}
