import { Request, Response, Router } from 'express';
import joi from 'joi';
import { QuestionUseCase, PostUseCase } from '../usecase';
import { handleResponseCatchError, response200 } from '../util/response';
const router = Router();

const randomQuestionRequest = joi.object<{
  number: number;
}>({
  number: joi.number().optional().default(1).min(1).max(10),
});
router.get('/random-questions', async (req: Request, res: Response) => {
  try {
    const valid = await randomQuestionRequest.validateAsync({
      ...req.query,
      ...req.body,
    });
    const question = await QuestionUseCase.getRandomQuestion(valid.number);
    response200(res, question);
    return;
  } catch (err: any) {
    handleResponseCatchError(res, err);
  }
});

const suggestionPostsRequest = joi.object<{
  tags: number[];
  limit: number;
  offset: number;
}>({
  tags: joi.array().items(joi.number()).required(),
  limit: joi.number().optional().default(5).min(1).max(50),
  offset: joi.number().optional().default(0).min(0),
});
router.get('/suggestion-posts', async (req: Request, res: Response) => {
  try {
    const valid = await suggestionPostsRequest.validateAsync({
      ...req.query,
    });
    const posts = await PostUseCase.getSuggestionPosts(valid);
    response200(res, posts);
    return;
  } catch (err: any) {
    handleResponseCatchError(res, err);
  }
});

export default router;
