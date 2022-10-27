import { UserUsecase } from '../usecase';
import { response500, response200 } from '../util/response';
import { Router } from 'express';
import { PostUseCase } from '../usecase/post.usecase';
const router = Router();

router.get('/user', async (req, res) => {
  try {
    const user = await UserUsecase.findOne(2);
    response200(res, user);
    return;
  } catch (err: any) {
    response500(res, err?.message || err);
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
    response500(res, err?.message || err);
  }
});

router.get('/post', async (req, res) => {
  try {
    const post = await PostUseCase.findOne(2);
    response200(res, post);
    return;
  } catch (err: any) {
    response500(res, err?.message || err);
  }
});

export default router;
