import { Request, Response, Router } from 'express';
import joi from 'joi';
import { StatusError } from '../model';
import { UploadUsecase } from '../usecase';
import { handleStatusError, response200, response500 } from '../util/response';
const router = Router();

const presignedUploadUrlRequest = joi.object<{
  fileName: string;
}>({
  fileName: joi.string().required(),
});
router.post('/upload/presigned-upload', async (req: Request, res: Response) => {
  try {
    const valid = await presignedUploadUrlRequest.validateAsync({
      ...req.body,
    });
    const presignedData = await UploadUsecase.getPresignedUploadUrl({
      ...valid,
      userId: 1,
    });
    response200(res, presignedData);
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
