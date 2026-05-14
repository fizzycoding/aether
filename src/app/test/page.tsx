import { trpc, HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { HealthStatus } from "./health-status";
import { ErrorBoundary } from "react-error-boundary";

export default async function TestPage() {
  // Prefetch the query on the server
  void trpc.health.prefetch();

  return (
    <HydrateClient>
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">tRPC Test Page</h1>
        <div className="p-6 border rounded-lg shadow-sm bg-card">
          <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <Suspense
              fallback={
                <p className="text-muted-foreground">Checking health...</p>
              }
            >
              <HealthStatus />
            </Suspense>
          </ErrorBoundary>
        </div>
        <p className="text-sm text-muted-foreground">
          If you see "Status: OK", your tRPC setup is working with Prefetching &
          Suspense!
        </p>
      </div>
    </HydrateClient>
  );
}
