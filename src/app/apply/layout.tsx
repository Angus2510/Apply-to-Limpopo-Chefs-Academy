import React from 'react';
import PageHeader from '@/components/PageHeader';
import StepNavigation from '@/components/StepNavigation';
import { AddApplyContextProvider } from '@/contexts/applyContext';

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AddApplyContextProvider>
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Step Navigation as Sidebar for Desktop */}
      <div className="hidden lg:block lg:w-[20%] lg:fixed lg:h-full lg:overflow-y-auto p-4 bg-white shadow-md">
        <StepNavigation />
      </div>
      {/* Page Content */}
      <div className="w-full lg:ml-[20%] flex flex-col items-center justify-start p-4 lg:p-8">
        {/* Page Header */}
        <div className="w-full max-w-3xl mx-auto">
          <PageHeader title="Application" />
        </div>
        {/* Step Navigation for Mobile */}
        <div className="lg:hidden w-full mb-4">
          <StepNavigation />
        </div>
        {/* Main Content */}
        <div className="w-full max-w-3xl mx-auto mt-4">{children}</div>
      </div>
    </div>
    </AddApplyContextProvider>
  );
}