import { Tag } from './tag.model';
import { User } from './user.model';

export class Post {
  public id?: number;

  public title?: string;

  public content?: string;

  public is_receipe?: boolean;

  public author?: User;

  public tags?: Tag[];

  public created_at?: Date;

  public updated_at?: Date;

  public upvote_users?: User[]; // upvote_users is the name of the relation in the schema

  public downvote_users?: User[]; // downvote_users is the name of the relation in the schema

  public upvote?: number; // upvotes is the name of the column in the schema

  public downvote?: number; // downvotes is the name of the column in the schema

  public cook_time?: number;

  public thumbnail?: string;
}

export class Score {
  public score?: number;
}
