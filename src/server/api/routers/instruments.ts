import { z } from "zod";
import { TRPCError } from "@trpc/server";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const instrumentsRouter = createTRPCRouter({
  createDrumsKit: protectedProcedure
    .input(z.object({ name: z.string().min(1), channels: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.drumsKit.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
          channels: input.channels,
        },
      });
    }),

  getAllDrumsKits: protectedProcedure.query(({ ctx }) => {
    return ctx.db.drumsKit.findMany({
      orderBy: { created: "desc" },
    });
  }),

  getDrumsKitById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.drumsKit.findUnique({
        where: { id: input.id },
      });
    }),
});
