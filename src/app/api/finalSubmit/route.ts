// app/api/finalSubmit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { handleFinalSubmission } from '@/utils/formSubmission';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await handleFinalSubmission(data);
    return NextResponse.json({ message: 'Final submission successful' });
  } catch (error) {
    console.error('Error during final submission:', error);
    return NextResponse.json({ message: 'Error during final submission' }, { status: 500 });
  }
}
