'use client'

import { use, useEffect } from 'react';
import { ProviderDetails } from '@/components/providers/provider-details';
import { LoadingOverlay } from '@/components/ui/loading-overlay';
import { PageLayout } from '@/components/layout/page-layout';
import { Suspense } from 'react';
import { toast } from 'react-toastify';

export default function ProviderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params); // Unwrap params using React's `use()`

  useEffect(() => {
    const message = sessionStorage.getItem('toastMessage');
    if (message) {
      toast.success(message);
      sessionStorage.removeItem('toastMessage'); // Prevent showing again on refresh
    }
  }, []);
  return (
    <Suspense fallback={
      <PageLayout
        variant="wide"
      >
        <LoadingOverlay isLoading={true} message="Loading provider details...">
          <div className="h-72 sm:h-96" />
        </LoadingOverlay>
      </PageLayout>
    }>
      <PageLayout
        variant="wide"
      >
        <ProviderDetails providerId={resolvedParams.id} />
      </PageLayout>
    </Suspense>
  );
}
