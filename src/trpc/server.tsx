import "server-only"; // <-- ensure this file cannot be imported from the client
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { createCallerFactory, createTRPCContext } from "./init";
import { makeQueryClient } from "./query-client";
import { appRouter } from "./routers/_app";

export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)(createTRPCContext);
export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient,
);

/**
 * A helper function to prefetch tRPC queries on the server.
 * In tRPC v11 RSC, you can call `trpc.procedure.prefetch(input)` 
 * and await it using this helper or directly.
 */
export async function prefetch(query: Promise<void>) {
  await query;
}
