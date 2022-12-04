import { EntitySchema } from 'typeorm';
import { Bookmark } from '../model';

const BookmarkSchema = new EntitySchema<Bookmark>({
  name: 'Bookmark',
  target: Bookmark,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    created_at: {
      type: Date,
      nullable: false,
      default: () => 'CURRENT_TIMESTAMP',
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinTable: {
        joinColumn: {
          name: 'user_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'id',
          referencedColumnName: 'user_id',
        },
      },
    },
    post: {
      type: 'many-to-one',
      target: 'Post',
      joinTable: {
        joinColumn: {
          name: 'post_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'id',
          referencedColumnName: 'post_id',
        },
      },
    },
  },
});
export default BookmarkSchema;
