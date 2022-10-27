import { Tag } from './tag.model';
import { User } from './user.model';

export class Post {
  public id?: number;

  public title?: string;

  public content?: string;

  public is_receipe?: boolean;

  public author?: User;

  public tags?: Tag[];

  public createdAt?: Date;

  public updatedAt?: Date;
}
