import { S3Client } from '@aws-sdk/client-s3';
import { envChecker } from '../utils/envChecker';

const s3: S3Client = new S3Client({
  endpoint: `https://${envChecker(process.env.ENDPOINT_BUCKET)}`,
  region: envChecker(process.env.LOCATION_BUCKET),
  credentials: {
    accessKeyId: envChecker(process.env.KEY_ID_BUCKET),
    secretAccessKey: envChecker(process.env.APP_KEY_BUCKET)
  }
});

export default s3;
