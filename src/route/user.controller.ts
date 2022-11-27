import { UserUsecase } from '../usecase';
import { response200, handleResponseCatchError } from '../util/response';
import { Router } from 'express';
import { PostUseCase } from '../usecase/post.usecase';
import joi from 'joi';
const router = Router();

router.get('/user', async (req, res) => {
  try {
    const user = await UserUsecase.findOne(2);
    response200(res, user);
    return;
  } catch (err: any) {
    handleResponseCatchError(res, err);
  }
});

router.get('/get-user', async (req, res) => {
  try {
    const user = await UserUsecase.createUser({
      id: 2,
      name: 'John Doe',
      age: 1,
    });
    response200(res, user);
    return;
  } catch (err: any) {
    handleResponseCatchError(res, err);
  }
});

router.get('/post', async (req, res) => {
  try {
    const post = await PostUseCase.findOne(2);
    response200(res, post);
    return;
  } catch (err: any) {
    handleResponseCatchError(res, err);
  }
});

const postUserBookmarkRequest = joi.object<{
  userId: number;
  postId: number;
}>({
  userId: joi.number().required(),
  postId: joi.number().required(),
});

router.post('/users/:userId/bookmarks', async (req, res) => {
  try {
    const valid = await postUserBookmarkRequest.validateAsync({
      ...req.body,
      ...req.params,
    });
    await UserUsecase.bookmarkPost(valid.userId, valid.postId);
    response200(res, 'OK');
    return;
  } catch (err: any) {
    handleResponseCatchError(res, err);
  }
});

const deleteUserBookmarkRequest = postUserBookmarkRequest;

router.delete('/users/:userId/bookmarks', async (req, res) => {
  try {
    const valid = await deleteUserBookmarkRequest.validateAsync({
      ...req.body,
      ...req.params,
    });
    await UserUsecase.deleteBookmarkPost(valid.userId, valid.postId);
    response200(res, 'OK');
    return;
  } catch (err: any) {
    handleResponseCatchError(res, err);
  }
});

const getUserBookmarkRequest = joi.object<{
  userId: number;
}>({
  userId: joi.number().required(),
});
router.get('/users/:userId/bookmarks', async (req, res) => {
  try {
    const valid = await getUserBookmarkRequest.validateAsync({
      ...req.params,
    });
    const bookmarks = await UserUsecase.getBookmarkPosts(valid.userId);
    response200(
      res,
      bookmarks.map((post) => post.id)
    );
    return;
  } catch (err: any) {
    handleResponseCatchError(res, err);
  }
});

export default router;
