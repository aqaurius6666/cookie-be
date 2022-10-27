import { Post } from './post.model';

export class Tag {
  public id?: number;

  public name?: string;

  public posts?: Post[];
}
