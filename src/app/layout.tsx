import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Apply to Limpopo Chefs Academy',
  description: 'Join us and start your culinary journey today!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="description" content="Join us and start your culinary journey today!" />
        <meta property="og:title" content="Apply to Limpopo Chefs Academy" />
        <meta property="og:description" content="Join us and start your culinary journey today!" />
        <meta property="og:image" content="/img/Banner.png" />
        <meta property="og:url" content="https://limpopochefs-apply.vercel.app/apply" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Apply to Limpopo Chefs Academy" />
        <meta name="twitter:description" content="Join us and start your culinary journey today!" />
        <meta name="twitter:image" content="/img/Banner.png" />
        <meta name="twitter:url" content="https://limpopochefs-apply.vercel.app/apply" />
      </Head>
      <body className={`${inter.className} bg-[#f5f5f5]`}>
        {children}
      </body>
    </html>
  );
}
