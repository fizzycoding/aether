import { baseProcedure, createTRPCRouter } from "../init";
// import { billingRouter } from './billing';
// import { generationsRouter } from './generations';
// import { voicesRouter } from './voices';
export const appRouter = createTRPCRouter({
  health: baseProcedure.query(() => {
    return "OK";
  }),

  // voices: voicesRouter,
  // generations: generationsRouter,
  // billing: billingRouter,
});

export type AppRouter = typeof appRouter;
