import { Tag } from './tag.model';

export class Question {
  public id?: number;

  public name?: string;

  public content?: string;

  public tags?: Tag[];
}
