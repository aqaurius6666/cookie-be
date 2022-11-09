import { Post } from './post.model';
import { Question } from './question.model';

export interface PostWithQuestions extends Post {
  questions: Question[];
}
