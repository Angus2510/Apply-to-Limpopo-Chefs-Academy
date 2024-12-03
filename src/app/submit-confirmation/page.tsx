// pages/apply/submit-confirmation.tsx
'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SubmitConfirmation() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md mx-auto mt-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Application Submitted</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <p className="text-center mb-4">Thank you for your application! We will review your submission and get back to you soon.</p>
          <Link href="https://limpopochefs.co.za/">
            <Button className="mt-4">Go to Website</Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
