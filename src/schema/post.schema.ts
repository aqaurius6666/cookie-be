import { EntitySchema } from 'typeorm';
import { Post } from '../model';

const PostSchema = new EntitySchema<Post>({
  name: 'Post',
  // target: Post,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    content: {
      type: String,
      nullable: false,
    },
    title: {
      type: String,
      nullable: false,
    },
    is_receipe: {
      type: Boolean,
      nullable: false,
      default: false,
    },
    created_at: {
      type: Date,
      nullable: false,
      default: () => 'CURRENT_TIMESTAMP',
    },
    updated_at: {
      type: Date,
      nullable: false,
      default: () => 'CURRENT_TIMESTAMP',
    },
  },
  relations: {
    upvote_users: {
      type: 'many-to-many',
      target: 'User',
      joinTable: {
        name: 'upvote_post',
        joinColumn: {
          name: 'post_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'user_id',
          referencedColumnName: 'id',
        },
      },
    },
    downvote_users: {
      type: 'many-to-many',
      target: 'User',
      joinTable: {
        name: 'downvote_post',
        joinColumn: {
          name: 'post_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'user_id',
          referencedColumnName: 'id',
        },
      },
    },
    author: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: {
        name: 'author_id',
        referencedColumnName: 'id',
      },
      nullable: false,
    },
    tags: {
      type: 'many-to-many',
      target: 'Tag',
      joinTable: {
        name: 'post_tag',
        joinColumn: {
          name: 'post_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'tag_id',
          referencedColumnName: 'id',
        },
      },
    },
  },
});

export default PostSchema;
