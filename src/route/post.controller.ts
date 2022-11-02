import { Request, Response, Router } from 'express';
import joi from 'joi';
import { StatusError } from '../model';
import { PostUseCase } from '../usecase/post.usecase';
import { handleStatusError, response200, response500 } from '../util/response';
const router = Router();

const postsRequest = joi.object<{
  id: number;
}>({
  id: joi.number().required(),
});
router.get('/post-by-id', async (req: Request, res: Response) => {
  try {
    const valid = await postsRequest.validateAsync({
      ...req.query,
    });
    const post = await PostUseCase.getPostById(valid.id);
    response200(res, post);
    return;
  } catch (err: any) {
    if (err instanceof StatusError) {
      handleStatusError(res, err);
      return;
    }
    response500(res, err?.message || err);
  }
});

export default router;
