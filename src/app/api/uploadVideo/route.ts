import { NextRequest, NextResponse } from 'next/server';
import { uploadFileToS3 } from '@/utils/uploadToS3';

export async function POST(req: NextRequest) {
  try {
    if (!req.headers.get('content-type')?.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Content-Type was not multipart/form-data' }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'Invalid file upload' }, { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const fileName = `${Date.now()}_${file.name}`;

    const fileUrl = await uploadFileToS3(fileBuffer, fileName);
    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
