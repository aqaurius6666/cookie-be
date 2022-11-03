import { Post } from './post.model';

export class User {
  public id?: number;

  public name?: string;

  public age?: number;

  public followers?: User[];

  public followings?: User[];

  public upvote_posts?: Post[];

  public downvote_posts?: Post[];
}
