import { Router } from 'express';
import { response200 } from '../util/response';

const router = Router();

router.get('/', async (req, res) => {
  response200(res, 'ok');
});

export default router;
