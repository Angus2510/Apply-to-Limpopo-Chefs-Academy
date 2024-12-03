import { S3Client, PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadFileToS3 = async (fileBuffer: ArrayBuffer, fileName: string): Promise<string> => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME as string,
    Key: `uploads/${fileName}`,
    Body: Buffer.from(fileBuffer),
    ContentType: 'application/octet-stream',
    ACL: 'private' as ObjectCannedACL, // Cast 'private' to ObjectCannedACL
  };

  try {
    const command = new PutObjectCommand(params);
    const data = await s3.send(command);
    return `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw new Error('Error uploading file to S3');
  }
};