import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ClientGreeting } from './client-greeting';
import { HydrateClient, trpc } from '@/videos/trpc/server';
export default async function Home() {
  void trpc.hello.prefetch();
  return (
    <HydrateClient>
      <div>...</div>
      {/** ... */}
      <ErrorBoundary fallback={<div>Something wen t wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <ClientGreeting />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}