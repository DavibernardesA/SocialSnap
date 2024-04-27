import { ServerError } from '../helpers/api-error';
import s3 from './aws';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';

const extractFileName = (imageUrl: string): string => {
  const lastSlashIndex: number = imageUrl.lastIndexOf('/');
  if (lastSlashIndex === -1) {
    throw new ServerError('Invalid image URL.');
  }
  return imageUrl.substring(lastSlashIndex + 1);
};

const fileDelete = async (imageUrl: string, path: string): Promise<void> => {
  const fileName: string = extractFileName(imageUrl);

  const deleteCommand: DeleteObjectCommand = new DeleteObjectCommand({
    Bucket: process.env.KEY_NAME_BUCKET,
    Key: `${path}/${fileName}`
  });

  await s3.send(deleteCommand);
  return;
};

export default fileDelete;
