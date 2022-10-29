import { In } from 'typeorm';
import { Question } from '../model';
import QuestionSchema from '../schema/question.schema';
import { dataSource } from './repository';

export class QuestionRepository {
  private static readonly repo = dataSource.getRepository(QuestionSchema);

  static async findById(id: number) {
    return await this.repo.findOne({
      where: {
        id,
      },
      relations: ['tags'],
    });
  }

  static async findByIds(ids: number[]) {
    return await this.repo.find({
      where: {
        id: In(ids),
      },
      relations: ['tags'],
    });
  }

  static async insertOne(question: Question) {
    return await this.repo.save(question);
  }

  static async getListAvailableId() {
    const questions = await this.repo.find({
      select: ['id'],
      where: {},
    });
    return questions.map((question) => question.id ?? 0);
  }
}
