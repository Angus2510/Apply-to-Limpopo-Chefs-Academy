'use client';
import Link from 'next/link';
import Head from 'next/head';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ApplyCard() {
  return (
    <>
      <Head>
        <title>Apply to Limpopo Chefs Academy</title>
        <meta name="description" content="Join us and start your culinary journey today!" />
        <meta property="og:title" content="Apply to Limpopo Chefs Academy" />
        <meta property="og:description" content="Join us and start your culinary journey today!" />
        <meta property="og:image" content="/img/Banner.png" /> {/* Path to the banner image */}
        <meta property="og:url" content="https://limpopochefs-apply.vercel.app/apply" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Apply to Limpopo Chefs Academy" />
        <meta name="twitter:description" content="Join us and start your culinary journey today!" />
        <meta name="twitter:image" content="/img/Banner.png" /> {/* Path to the banner image */}
      </Head>
      <main className="flex min-h-screen flex-col items-center">
        <Card className="w-full max-w-md mx-auto mt-4">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Apply to Limpopo Chefs Academy</CardTitle>
            <p className="text-sm text-gray-500">Join us and start your culinary journey today!</p>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/apply/step-one">
              <Button className="mt-4">Apply</Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
