import { shuffle } from 'radash';
import { NOT_ENOUGH_QUESTION, User } from '../model';
import { QuestionRepository } from '../repository';

export class QuestionUseCase {
  private static readonly questionRepo = QuestionRepository;

  static async findOne(id: number) {
    return await this.questionRepo.findById(id);
  }

  static async createUser(user: User) {
    return await this.questionRepo.insertOne(user);
  }

  static async getRandomQuestion(n: number) {
    const ids = await this.questionRepo.getListAvailableId();

    const randomElement = (arr: number[], n: number) => {
      if (arr.length === 0 || n > arr.length) throw NOT_ENOUGH_QUESTION;

      arr = shuffle(arr);
      return arr.slice(0, n);
    };

    const chosenIds = randomElement(ids, n);

    return await this.questionRepo.findByIds(chosenIds);
  }
}
