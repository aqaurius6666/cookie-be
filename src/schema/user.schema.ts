import { EntitySchema } from 'typeorm';
import { User } from '../model';

const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
  },
  relations: {
    upvote_posts: {
      type: 'many-to-many',
      target: 'Post',
      joinTable: {
        name: 'upvote_post',
        joinColumn: {
          name: 'user_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'post_id',
          referencedColumnName: 'id',
        },
      },
    },
    downvote_posts: {
      type: 'many-to-many',
      target: 'Post',
      joinTable: {
        name: 'downvote_post',
        joinColumn: {
          name: 'user_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'post_id',
          referencedColumnName: 'id',
        },
      },
    },
    followers: {
      type: 'many-to-many',
      target: 'User',
      joinTable: {
        name: 'follow',
        joinColumn: {
          name: 'target_user_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'user_id',
          referencedColumnName: 'id',
        },
      },
    },
    followings: {
      type: 'many-to-many',
      target: 'User',
      joinTable: {
        name: 'follow',
        joinColumn: {
          name: 'user_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'target_user_id',
          referencedColumnName: 'id',
        },
      },
    },
  },
});

export default UserSchema;
