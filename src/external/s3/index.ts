import { S3Client } from '@aws-sdk/client-s3';

import { createPresignedPost } from '@aws-sdk/s3-presigned-post';

const config = {
  AWS_S3_ENDPOINT: process.env.AWS_S3_ENDPOINT,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ?? '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  AWS_REGION: process.env.AWS_REGION ?? '',
  AWS_BUCKET: process.env.AWS_BUCKET ?? '',
};

const client = new S3Client({
  region: config.AWS_REGION,
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
  endpoint: config.AWS_S3_ENDPOINT,
});

export const getPostPresignUrl = async (input: {
  key: string;
  mineType: string;
}) => {
  const presigned = await createPresignedPost(client, {
    Bucket: config.AWS_BUCKET,
    Key: input.key,
    Fields: {
      'Content-Type': input.mineType,
    },
  });
  return {
    url: presigned.url,
    fields: presigned.fields,
  };
};
