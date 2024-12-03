import AWS from 'aws-sdk';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');

    if (!key) {
      return NextResponse.json({ message: 'Missing key parameter' }, { status: 400 });
    }

    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Expires: 60, // URL expiry time in seconds
    };

    const signedUrl = s3.getSignedUrl('getObject', params);
    console.log('Signed URL:', signedUrl); // Log the signed URL
    return NextResponse.json({ url: signedUrl }, { status: 200 });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    return NextResponse.json({ message: 'Error generating URL', error }, { status: 500 });
  }
}
