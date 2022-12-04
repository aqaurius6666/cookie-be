import { Post } from './post.model';
import { User } from './user.model';

export class Bookmark {
  public id?: number;
  public user?: User;

  public post?: Post;

  public created_at?: Date;
}
