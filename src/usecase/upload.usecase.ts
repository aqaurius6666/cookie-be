import { randomUUID } from 'crypto';
import { getPostPresignUrl } from '../external/s3';
import { parseMineType } from '../util/file';

export interface PresignedUploadDto {
  url: string;
  fields: {
    [field in string]: string;
  };
}

export class UploadUsecase {
  static async getPresignedUploadUrl(input: {
    fileName: string;
    userId: number;
  }): Promise<PresignedUploadDto> {
    const mineType = parseMineType(input.fileName);
    const key = `uploads/${input.userId}/${randomUUID()}.${
      input.fileName.split('.').pop() ?? 'unknown'
    }`;
    const data = await getPostPresignUrl({
      key,
      mineType,
    });
    return data;
  }
}
