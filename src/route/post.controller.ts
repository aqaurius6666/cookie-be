import { Request, Response, Router } from 'express';
import joi from 'joi';
import { PostUseCase } from '../usecase';
import { buildPaginationResponse } from '../util/pagination';
import { handleResponseCatchError, response200 } from '../util/response';
import { SKIP_AUTH_USER_ID } from './server';
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
    const post = await PostUseCase.getPostWithQuestionsById(valid.id);
    response200(res, post);
    return;
  } catch (err: any) {
    handleResponseCatchError(res, err);
  }
});

const createPostRequest = joi.object<{
  title: string;
  content: string;
  isReceipe: boolean;
  tagIds: number[];
  cookTime: number;
  thumbnail: string;
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
  thumbnail: joi.string().required(),
});
router.post('/posts', async (req: Request, res: Response) => {
  try {
    const valid = await createPostRequest.validateAsync({
      ...req.body,
    });
    const userId = 2;
    const post = await PostUseCase.createPost(valid, userId);
    response200(res, post);
    return;
  } catch (err: any) {
    handleResponseCatchError(res, err);
  }
});
const updatePostRequest = joi.object<{
  title: string;
  content: string;
  isReceipe: boolean;
  tagIds: number[];
  cookTime: number;
  id: number;
  thumbnail: string;
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
  thumbnail: joi.string().required(),
});
router.put('/posts/:id', async (req: Request, res: Response) => {
  try {
    const valid = await updatePostRequest.validateAsync({
      ...req.body,
      ...req.params,
    });
    const userId = 2;
    const post = await PostUseCase.updatePost(valid, userId);
    response200(res, post);
    return;
  } catch (err: any) {
    handleResponseCatchError(res, err);
  }
});

const getPostsRequest = joi.object<{
  offset: number;
  limit: number;
}>({
  limit: joi.number().optional().default(5).integer(),
  offset: joi.number().optional().default(0).integer(),
});

router.get('/posts/me', async (req: Request, res: Response) => {
  try {
    const valid = await getPostsRequest.validateAsync({
      ...req.body,
      ...req.query,
    });
    const [total, posts] = await Promise.all([
      PostUseCase.countPosts({ userId: SKIP_AUTH_USER_ID }),
      PostUseCase.listPosts({
        ...valid,
        userId: SKIP_AUTH_USER_ID,
      }),
    ]);
    response200(res, {
      pagination: buildPaginationResponse({ ...valid, total }),
      posts,
    });
    return;
  } catch (err: any) {
    handleResponseCatchError(res, err);
  }
});

router.get('/posts', async (req: Request, res: Response) => {
  try {
    const valid = await getPostsRequest.validateAsync({
      ...req.body,
      ...req.query,
    });
    const [total, posts] = await Promise.all([
      PostUseCase.countPosts({}),
      PostUseCase.listPosts({
        ...valid,
      }),
    ]);
    response200(res, {
      pagination: buildPaginationResponse({ ...valid, total }),
      posts,
    });
    return;
  } catch (err: any) {
    handleResponseCatchError(res, err);
  }
});

router.get('/posts/bookmark', async (req: Request, res: Response) => {
  try {
    const valid = await getPostsRequest.validateAsync({
      ...req.query,
    });
    const [total, posts] = await Promise.all([
      PostUseCase.countPostsBookmark({ userId: SKIP_AUTH_USER_ID }),
      PostUseCase.listPostsBookmark({
        ...valid,
        userId: SKIP_AUTH_USER_ID,
      }),
    ]);
    response200(res, {
      pagination: buildPaginationResponse({ ...valid, total }),
      posts,
    });
    return;
  } catch (err: any) {
    handleResponseCatchError(res, err);
  }
});
export default router;
