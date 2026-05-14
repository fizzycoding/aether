"use client";

import { trpc } from "@/trpc/client";

export function HealthStatus() {
  const [data] = trpc.health.useSuspenseQuery();

  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">Status:</span>
      <span className="px-2 py-1 text-xs font-bold text-white bg-green-500 rounded uppercase">
        {data}
      </span>
    </div>
  );
}
