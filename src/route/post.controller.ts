import { Request, Response, Router } from 'express';
import joi from 'joi';
import { StatusError } from '../model';
import { PostUseCase } from '../usecase/post.usecase';
import { buildPaginationResponse } from '../util/pagination';
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

const createPostRequest = joi.object<{
  title: string;
  content: string;
  isReceipe: boolean;
  tagIds: number[];
  cookTime: number;
}>({
  title: joi.string().required().min(6).max(512),
  content: joi
    .string()
    .required()
    .min(6)
    .max(1024 * 1024),
  isReceipe: joi.boolean().required().default(true),
  tagIds: joi.array().items(joi.number().integer()).required(),
  cookTime: joi.number().optional().default(0).min(1).integer(),
});
router.post('/posts', async (req: Request, res: Response) => {
  try {
    const valid = await createPostRequest.validateAsync({
      ...req.body,
    });
    const post = await PostUseCase.createPost(valid);
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
const updatePostRequest = joi.object<{
  title: string;
  content: string;
  isReceipe: boolean;
  tagIds: number[];
  cookTime: number;
  id: number;
}>({
  title: joi.string().optional().min(6).max(512),
  content: joi
    .string()
    .optional()
    .min(6)
    .max(1024 * 1024),
  isReceipe: joi.boolean().optional().default(true),
  tagIds: joi.array().items(joi.number().integer()).optional(),
  cookTime: joi.number().optional().default(0).min(1).integer(),
  id: joi.number().required(),
});
router.put('/posts/:id', async (req: Request, res: Response) => {
  try {
    const valid = await updatePostRequest.validateAsync({
      ...req.body,
      ...req.params,
    });
    const post = await PostUseCase.updatePost(valid);
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

const getPostsRequest = joi.object<{
  offset: number;
  limit: number;
}>({
  limit: joi.number().optional().default(5).integer(),
  offset: joi.number().optional().default(0).integer(),
});

router.get('/posts', async (req: Request, res: Response) => {
  try {
    const valid = await getPostsRequest.validateAsync({
      ...req.body,
    });
    const [total, posts] = await Promise.all([
      PostUseCase.countPosts(),
      PostUseCase.listPosts(valid),
    ]);
    response200(res, {
      pagination: buildPaginationResponse({ ...valid, total }),
      posts,
    });
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
