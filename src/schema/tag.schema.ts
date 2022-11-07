import { EntitySchema } from 'typeorm';
import { Tag } from '../model';

const TagSchema = new EntitySchema<Tag>({
  name: 'Tag',
  target: Tag,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
      nullable: false,
    },
    is_required: {
      type: Boolean,
      nullable: false,
      default: false,
    },
  },
  relations: {
    posts: {
      type: 'many-to-many',
      target: 'Post',
      joinTable: {
        name: 'post_tag',
        joinColumn: {
          name: 'tag_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'post_id',
          referencedColumnName: 'id',
        },
      },
    },
  },
});

export default TagSchema;
