import { EntitySchema } from 'typeorm';
import { Question } from '../model/question.model';

const QuestionSchema = new EntitySchema<Question>({
  name: 'Question',
  target: Question,
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
    content: {
      type: String,
      nullable: false,
    },
  },
  relations: {
    tags: {
      type: 'many-to-many',
      target: 'Tag',
      joinTable: {
        name: 'question_tag',
        joinColumn: {
          name: 'question_id',
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

export default QuestionSchema;
