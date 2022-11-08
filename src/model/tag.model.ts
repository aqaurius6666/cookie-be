import { Post } from './post.model';
import { Question } from './question.model';

export class Tag {
  public id?: number;

  public name?: string;

  public is_required?: boolean;

  public posts?: Post[];

  public questions?: Question[];
}
