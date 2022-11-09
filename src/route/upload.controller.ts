import { Request, Response, Router } from 'express';
import joi from 'joi';
import { UploadUsecase } from '../usecase';
import { handleResponseCatchError, response200 } from '../util/response';
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
    handleResponseCatchError(res, err);
  }
});

export default router;
