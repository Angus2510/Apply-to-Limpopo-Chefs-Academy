import React from 'react';
import Image from 'next/image';

export default function PageHeader({
  title,
}: {
  title: string;
}) {
  return (
    <div className="flex items-center gap-8 mb-4 p-4 lg:p-8 bg-white rounded-lg shadow-md w-full max-w-3xl mx-auto">
      <Image src="/img/logo.png" alt="Logo" width={150} height={150} className="rounded-lg" />
      <div>
        <h1 className="text-2xl font-semibold text-black md:text-3xl">
          {title}
        </h1>
      </div>
    </div>
  );
}
